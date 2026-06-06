import { Request, Response } from "express";
import User from "../models/userModel";
import Send from "../models/sendModel";
import { mailprexMode } from "../config/mailprexMode";
import { getMonthlyLimit, UserPlan } from "../config/plans";
import { sanitizeAdminUser } from "../utils/sanitizeUser";
import { clearUserFormToken } from "../utils/formToken";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

function parsePagination(query: Request["query"]) {
  const page = Math.max(1, parseInt(String(query.page ?? "1"), 10) || 1);
  const limit = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, parseInt(String(query.limit ?? DEFAULT_PAGE_SIZE), 10) || DEFAULT_PAGE_SIZE)
  );
  return { page, limit, skip: (page - 1) * limit };
}

export const getPlatformStats = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      verifiedUsers,
      usersByPlan,
      totalSends,
      sendsLast24h,
      sendsLast30d,
      failedSends,
      sendsByStatus,
      recentSignups,
    ] = await Promise.all([
      User.countDocuments({ isSystem: { $ne: true } }),
      User.countDocuments({ verified: true, isSystem: { $ne: true } }),
      User.aggregate([
        { $match: { isSystem: { $ne: true } } },
        { $group: { _id: "$userType", count: { $sum: 1 } } },
      ]),
      Send.countDocuments(),
      Send.countDocuments({ createdAt: { $gte: dayAgo } }),
      Send.countDocuments({ createdAt: { $gte: monthAgo } }),
      Send.countDocuments({ status: "failed" }),
      Send.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      User.countDocuments({
        createdAt: { $gte: monthAgo },
        isSystem: { $ne: true },
      }),
    ]);

    const planCounts = {
      free: 0,
      standard: 0,
      business: 0,
    };

    for (const row of usersByPlan) {
      const key = row._id as keyof typeof planCounts;
      if (key in planCounts) {
        planCounts[key] = row.count;
      }
    }

    res.status(200).json({
      mode: mailprexMode,
      users: {
        total: totalUsers,
        verified: verifiedUsers,
        signupsLast30d: recentSignups,
        byPlan: planCounts,
      },
      sends: {
        total: totalSends,
        last24h: sendsLast24h,
        last30d: sendsLast30d,
        failed: failedSends,
        byStatus: sendsByStatus.reduce(
          (acc: Record<string, number>, row: { _id: string; count: number }) => {
            acc[row._id] = row.count;
            return acc;
          },
          {}
        ),
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to load platform stats" });
  }
};

export const listUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const search = String(req.query.search ?? "").trim();

    const filter: Record<string, unknown> = { isSystem: { $ne: true } };

    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-password"),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      users: users.map(sanitizeAdminUser),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error("Admin list users error:", error);
    res.status(500).json({ message: "Failed to list users" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.isSystem) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { userType, verified, requestCount } = req.body as {
      userType?: UserPlan;
      verified?: boolean;
      requestCount?: number;
    };

    if (userType && ["free", "standard", "business"].includes(userType)) {
      user.userType = userType;
    }

    if (typeof verified === "boolean") {
      user.verified = verified;
    }

    if (typeof requestCount === "number" && requestCount >= 0) {
      user.requestCount = requestCount;
    }

    await user.save();

    res.status(200).json({ user: sanitizeAdminUser(user) });
  } catch (error) {
    console.error("Admin update user error:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const revokeUserFormToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.isSystem) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await User.findByIdAndUpdate(user._id, {
      $unset: {
        formToken: "",
        formTokenHash: "",
        formTokenPrefix: "",
      },
    });

    res.status(200).json({ message: "Form token revoked" });
  } catch (error) {
    console.error("Admin revoke token error:", error);
    res.status(500).json({ message: "Failed to revoke form token" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.isSystem) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (req.user && String(user._id) === String(req.user._id)) {
      res.status(400).json({ message: "You cannot delete your own account here" });
      return;
    }

    clearUserFormToken(user);
    await Send.deleteMany({ userId: user._id });
    await user.deleteOne();

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Admin delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const listSends = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const status = String(req.query.status ?? "").trim();

    const filter: Record<string, unknown> = {};
    if (status === "sent" || status === "failed") {
      filter.status = status;
    }

    const [sends, total] = await Promise.all([
      Send.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId", "email name lastName userType"),
      Send.countDocuments(filter),
    ]);

    res.status(200).json({
      sends: sends.map((send) => ({
        id: send._id,
        to: send.to,
        webName: send.webName,
        status: send.status,
        error: send.error,
        createdAt: send.createdAt,
        user: send.userId
          ? {
              id: (send.userId as { _id: unknown })._id,
              email: (send.userId as { email?: string }).email,
              name: (send.userId as { name?: string }).name,
              lastName: (send.userId as { lastName?: string }).lastName,
              userType: (send.userId as { userType?: string }).userType,
            }
          : null,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error("Admin list sends error:", error);
    res.status(500).json({ message: "Failed to list sends" });
  }
};

export const getUserDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user || user.isSystem) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const [sendStats, recentSends] = await Promise.all([
      Send.aggregate([
        { $match: { userId: user._id } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Send.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("to webName status createdAt error"),
    ]);

    const monthlyLimit = getMonthlyLimit(user.userType as UserPlan);

    res.status(200).json({
      user: {
        ...sanitizeAdminUser(user),
        monthlyLimit: Number.isFinite(monthlyLimit) ? monthlyLimit : null,
        hasFormToken: Boolean(user.formTokenHash || user.formToken),
        legacyFormToken: Boolean(user.formToken && !user.formTokenHash),
      },
      sendStats: sendStats.reduce(
        (acc: Record<string, number>, row: { _id: string; count: number }) => {
          acc[row._id] = row.count;
          return acc;
        },
        {}
      ),
      recentSends,
    });
  } catch (error) {
    console.error("Admin user detail error:", error);
    res.status(500).json({ message: "Failed to load user detail" });
  }
};

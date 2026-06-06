import { Response } from "express";
import User from "../models/userModel";
import { ensureFormTokenIndexes } from "../bootstrap/ensureFormTokenIndexes";
import { CustomRequest } from "../types/CustomRequest";
import {
  createFormTokenCredentials,
  getFormTokenDisplayPrefix,
  isLegacyFormToken,
  userHasFormToken,
} from "../utils/formToken";

async function persistFormToken(userId: unknown, hash: string, prefix: string) {
  await User.findByIdAndUpdate(userId, {
    $set: {
      formTokenHash: hash,
      formTokenPrefix: prefix,
    },
    $unset: {
      formToken: "",
    },
  });
}

export const generateFormToken = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found in request" });
    }

    const { rawToken, prefix, hash } = await createFormTokenCredentials();

    try {
      await persistFormToken(req.user._id, hash, prefix);
    } catch (error) {
      const mongoError = error as { code?: number };
      if (mongoError.code !== 11000) {
        throw error;
      }

      await ensureFormTokenIndexes();
      await persistFormToken(req.user._id, hash, prefix);
    }

    res.status(200).json({
      formToken: rawToken,
      prefix: `${prefix}…`,
    });
  } catch (error) {
    console.error("Error to generate formToken:", error);
    res.status(500).json({ message: "Error to generate formToken" });
  }
};

export const getFormToken = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found in request" });
    }

    const user = req.user;

    if (!userHasFormToken(user)) {
      return res.status(200).json({ hasToken: false });
    }

    return res.status(200).json({
      hasToken: true,
      prefix: getFormTokenDisplayPrefix(user),
      legacy: isLegacyFormToken(user),
    });
  } catch (error) {
    console.error("Error getting formToken:", error);
    res.status(500).json({ message: "Error getting formToken" });
  }
};

export const deleteFormToken = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found in request" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $unset: {
        formToken: "",
        formTokenHash: "",
        formTokenPrefix: "",
      },
    });

    res.status(200).json({ message: "formToken deleted" });
  } catch (error) {
    console.error("Error to delete formToken:", error);
    res.status(500).json({ message: "Error to delete formToken" });
  }
};

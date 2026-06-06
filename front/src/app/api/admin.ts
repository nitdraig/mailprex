import { authFetch } from "./fetchAuth";

export type AdminPlatformStats = {
  mode: string;
  users: {
    total: number;
    verified: number;
    signupsLast30d: number;
    byPlan: { free: number; standard: number; business: number };
  };
  sends: {
    total: number;
    last24h: number;
    last30d: number;
    failed: number;
    byStatus: Record<string, number>;
  };
};

export type AdminUser = {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  userType: "free" | "standard" | "business";
  requestCount: number;
  lastRequest: string;
  verified: boolean;
  createdAt?: string;
  subscriptionStatus?: string;
  hasGoogleId?: boolean;
};

export type AdminSend = {
  id: string;
  to: string;
  webName: string;
  status: "sent" | "failed";
  error?: string;
  createdAt: string;
  user: {
    id: string;
    email?: string;
    name?: string;
    lastName?: string;
    userType?: string;
  } | null;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

async function parseJson<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      typeof data?.message === "string" ? data.message : "Admin request failed"
    );
  }
  return data as T;
}

export const fetchAdminStats = () =>
  authFetch("/admin/stats").then((response) =>
    parseJson<AdminPlatformStats>(response)
  );

export const fetchAdminUsers = (params: {
  page?: number;
  search?: string;
}) => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.search) query.set("search", params.search);

  return authFetch(`/admin/users?${query}`).then((response) =>
    parseJson<{ users: AdminUser[]; pagination: Pagination }>(response)
  );
};

export const fetchAdminSends = (params: {
  page?: number;
  status?: string;
}) => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.status) query.set("status", params.status);

  return authFetch(`/admin/sends?${query}`).then((response) =>
    parseJson<{ sends: AdminSend[]; pagination: Pagination }>(response)
  );
};

export const updateAdminUser = (
  userId: string,
  payload: Partial<Pick<AdminUser, "userType" | "verified" | "requestCount">>
) =>
  authFetch(`/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  }).then((response) => parseJson<{ user: AdminUser }>(response));

export const revokeAdminUserToken = (userId: string) =>
  authFetch(`/admin/users/${userId}/revoke-token`, { method: "POST" }).then(
    (response) => parseJson<{ message: string }>(response)
  );

export const deleteAdminUser = (userId: string) =>
  authFetch(`/admin/users/${userId}`, { method: "DELETE" }).then((response) =>
    parseJson<{ message: string }>(response)
  );

"use client";

import { AdminUser, Pagination } from "@/app/api/admin";
import { format } from "date-fns";

type AdminUsersPanelProps = {
  users: AdminUser[];
  pagination: Pagination | null;
  loading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onPageChange: (page: number) => void;
  onUpdateUser: (
    userId: string,
    payload: Partial<Pick<AdminUser, "userType" | "verified" | "requestCount">>
  ) => Promise<void>;
  onRevokeToken: (userId: string) => Promise<void>;
  onDeleteUser: (userId: string) => Promise<void>;
};

const AdminUsersPanel = ({
  users,
  pagination,
  loading,
  search,
  onSearchChange,
  onSearchSubmit,
  onPageChange,
  onUpdateUser,
  onRevokeToken,
  onDeleteUser,
}: AdminUsersPanelProps) => {
  return (
    <div className="space-y-4">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
      >
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or email"
          className="postal-input flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-[#0f1729]"
        />
        <button type="submit" className="postal-btn-primary px-4 py-2 text-sm">
          Search
        </button>
      </form>

      <div className="postal-dashboard-card overflow-x-auto">
        {loading ? (
          <p className="postal-dashboard-muted">Loading users…</p>
        ) : users.length === 0 ? (
          <p className="postal-dashboard-empty">No users found.</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-white/10">
                <th className="px-2 py-2 font-medium">User</th>
                <th className="px-2 py-2 font-medium">Plan</th>
                <th className="px-2 py-2 font-medium">Usage</th>
                <th className="px-2 py-2 font-medium">Status</th>
                <th className="px-2 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-100 dark:border-white/[0.06]"
                >
                  <td className="px-2 py-3 align-top">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {user.name} {user.lastName}
                    </p>
                    <p className="postal-dashboard-muted text-xs">{user.email}</p>
                    {user.createdAt ? (
                      <p className="postal-dashboard-muted text-xs">
                        Joined {format(new Date(user.createdAt), "dd MMM yyyy")}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-2 py-3 align-top">
                    <select
                      value={user.userType}
                      onChange={(event) =>
                        onUpdateUser(user._id, {
                          userType: event.target.value as AdminUser["userType"],
                        })
                      }
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs dark:border-white/10 dark:bg-[#0f1729]"
                    >
                      <option value="free">Free</option>
                      <option value="standard">Pro</option>
                      <option value="business">Business</option>
                    </select>
                  </td>
                  <td className="px-2 py-3 align-top">
                    <p>{user.requestCount} sends</p>
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline"
                      onClick={() => onUpdateUser(user._id, { requestCount: 0 })}
                    >
                      Reset count
                    </button>
                  </td>
                  <td className="px-2 py-3 align-top">
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={user.verified}
                        onChange={(event) =>
                          onUpdateUser(user._id, { verified: event.target.checked })
                        }
                      />
                      Verified
                    </label>
                  </td>
                  <td className="px-2 py-3 align-top">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        className="text-left text-xs text-amber-600 hover:underline dark:text-amber-400"
                        onClick={() => onRevokeToken(user._id)}
                      >
                        Revoke token
                      </button>
                      <button
                        type="button"
                        className="text-left text-xs text-red-600 hover:underline dark:text-red-400"
                        onClick={() => onDeleteUser(user._id)}
                      >
                        Delete user
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pagination && pagination.pages > 1 ? (
        <div className="flex items-center justify-between gap-3">
          <p className="postal-dashboard-muted text-xs">
            Page {pagination.page} of {pagination.pages} · {pagination.total} users
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagination.page <= 1}
              className="postal-btn-primary px-3 py-1 text-xs disabled:opacity-50"
              onClick={() => onPageChange(pagination.page - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pagination.page >= pagination.pages}
              className="postal-btn-primary px-3 py-1 text-xs disabled:opacity-50"
              onClick={() => onPageChange(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminUsersPanel;

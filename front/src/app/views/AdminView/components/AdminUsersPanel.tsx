"use client";

import { AdminUser, Pagination } from "@/app/api/admin";
import { format } from "date-fns";
import AdminPagination from "./AdminPagination";

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
      <div className="postal-dashboard-card">
        <p className="postal-dashboard-label mb-3">Search users</p>
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
            placeholder="Name or email"
            className="postal-dashboard-field flex-1"
          />
          <button type="submit" className="postal-dashboard-btn sm:shrink-0">
            Search
          </button>
        </form>
      </div>

      <div className="postal-dashboard-card overflow-x-auto">
        {loading ? (
          <p className="postal-dashboard-muted p-4">Loading users…</p>
        ) : users.length === 0 ? (
          <div className="postal-dashboard-empty m-4">No users found.</div>
        ) : (
          <table className="postal-dashboard-table min-w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Plan</th>
                <th>Usage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {user.name} {user.lastName}
                    </p>
                    <p className="postal-dashboard-muted text-xs">
                      {user.email}
                    </p>
                    {user.createdAt ? (
                      <p className="postal-dashboard-muted text-xs">
                        Joined{" "}
                        {format(new Date(user.createdAt), "dd MMM yyyy")}
                      </p>
                    ) : null}
                  </td>
                  <td>
                    <select
                      value={user.userType}
                      onChange={(event) =>
                        onUpdateUser(user._id, {
                          userType: event.target.value as AdminUser["userType"],
                        })
                      }
                      className="postal-dashboard-field py-1.5 text-xs"
                    >
                      <option value="free">Free</option>
                      <option value="standard">Pro</option>
                      <option value="business">Business</option>
                    </select>
                  </td>
                  <td>
                    <p className="font-medium">{user.requestCount} sends</p>
                    <button
                      type="button"
                      className="mt-1 text-xs font-medium text-primary hover:underline dark:text-accent"
                      onClick={() => onUpdateUser(user._id, { requestCount: 0 })}
                    >
                      Reset count
                    </button>
                  </td>
                  <td>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={user.verified}
                        onChange={(event) =>
                          onUpdateUser(user._id, {
                            verified: event.target.checked,
                          })
                        }
                        className="rounded border-slate-300 dark:border-white/20"
                      />
                      Verified
                    </label>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        className="text-left text-xs font-medium text-amber-600 hover:underline dark:text-amber-400"
                        onClick={() => onRevokeToken(user._id)}
                      >
                        Revoke token
                      </button>
                      <button
                        type="button"
                        className="text-left text-xs font-medium text-red-600 hover:underline dark:text-red-400"
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

      {pagination ? (
        <AdminPagination
          pagination={pagination}
          itemLabel="users"
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
};

export default AdminUsersPanel;

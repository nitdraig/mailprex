"use client";

import { AdminSend, Pagination } from "@/app/api/admin";
import { format } from "date-fns";
import AdminPagination from "./AdminPagination";

type AdminSendsPanelProps = {
  sends: AdminSend[];
  pagination: Pagination | null;
  loading: boolean;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onPageChange: (page: number) => void;
};

const AdminSendsPanel = ({
  sends,
  pagination,
  loading,
  statusFilter,
  onStatusFilterChange,
  onPageChange,
}: AdminSendsPanelProps) => {
  return (
    <div className="space-y-4">
      <div className="postal-dashboard-card">
        <div className="flex flex-wrap items-center gap-3">
          <label
            className="postal-dashboard-label shrink-0"
            htmlFor="send-status-filter"
          >
            Filter
          </label>
          <select
            id="send-status-filter"
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
            className="postal-dashboard-field w-auto min-w-[10rem]"
          >
            <option value="">All statuses</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="postal-dashboard-card overflow-x-auto">
        {loading ? (
          <p className="postal-dashboard-muted p-4">Loading delivery log…</p>
        ) : sends.length === 0 ? (
          <div className="postal-dashboard-empty m-4">
            No sends recorded yet.
          </div>
        ) : (
          <table className="postal-dashboard-table min-w-full">
            <thead>
              <tr>
                <th>When</th>
                <th>Site</th>
                <th>To</th>
                <th>Owner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sends.map((send) => (
                <tr key={send.id}>
                  <td className="text-xs text-slate-600 dark:text-slate-400">
                    {format(new Date(send.createdAt), "dd MMM yyyy HH:mm")}
                  </td>
                  <td>{send.webName}</td>
                  <td>{send.to}</td>
                  <td className="postal-dashboard-muted">
                    {send.user?.email ?? "—"}
                  </td>
                  <td>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                        send.status === "sent"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {send.status}
                    </span>
                    {send.error ? (
                      <p className="postal-dashboard-muted mt-1 text-xs">
                        {send.error}
                      </p>
                    ) : null}
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
          itemLabel="sends"
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
};

export default AdminSendsPanel;

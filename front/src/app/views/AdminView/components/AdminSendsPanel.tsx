"use client";

import { AdminSend, Pagination } from "@/app/api/admin";
import { format } from "date-fns";

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
      <div className="flex flex-wrap items-center gap-3">
        <label className="postal-dashboard-label" htmlFor="send-status-filter">
          Filter
        </label>
        <select
          id="send-status-filter"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-[#0f1729]"
        >
          <option value="">All statuses</option>
          <option value="sent">Sent</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="postal-dashboard-card overflow-x-auto">
        {loading ? (
          <p className="postal-dashboard-muted">Loading delivery log…</p>
        ) : sends.length === 0 ? (
          <p className="postal-dashboard-empty">No sends recorded yet.</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-white/10">
                <th className="px-2 py-2 font-medium">When</th>
                <th className="px-2 py-2 font-medium">Site</th>
                <th className="px-2 py-2 font-medium">To</th>
                <th className="px-2 py-2 font-medium">Owner</th>
                <th className="px-2 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {sends.map((send) => (
                <tr
                  key={send.id}
                  className="border-b border-slate-100 dark:border-white/[0.06]"
                >
                  <td className="px-2 py-3 align-top text-xs">
                    {format(new Date(send.createdAt), "dd MMM yyyy HH:mm")}
                  </td>
                  <td className="px-2 py-3 align-top">{send.webName}</td>
                  <td className="px-2 py-3 align-top">{send.to}</td>
                  <td className="px-2 py-3 align-top">
                    {send.user?.email ?? "—"}
                  </td>
                  <td className="px-2 py-3 align-top">
                    <span
                      className={
                        send.status === "sent"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }
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

      {pagination && pagination.pages > 1 ? (
        <div className="flex items-center justify-between gap-3">
          <p className="postal-dashboard-muted text-xs">
            Page {pagination.page} of {pagination.pages} · {pagination.total}{" "}
            sends
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

export default AdminSendsPanel;

"use client";

import { Pagination } from "@/app/api/admin";

type AdminPaginationProps = {
  pagination: Pagination;
  itemLabel: string;
  onPageChange: (page: number) => void;
};

const AdminPagination = ({
  pagination,
  itemLabel,
  onPageChange,
}: AdminPaginationProps) => {
  if (pagination.pages <= 1) return null;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="postal-dashboard-muted text-sm">
        Page {pagination.page} of {pagination.pages} · {pagination.total}{" "}
        {itemLabel}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pagination.page <= 1}
          className="postal-dashboard-btn-ghost"
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pagination.page >= pagination.pages}
          className="postal-dashboard-btn"
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;

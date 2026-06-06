"use client";

import { AdminPlatformStats } from "@/app/api/admin";
import AdminStatCard from "./AdminStatCard";

type AdminStatsPanelProps = {
  stats: AdminPlatformStats | null;
  loading: boolean;
};

const AdminStatsPanel = ({ stats, loading }: AdminStatsPanelProps) => {
  if (loading) {
    return (
      <div className="postal-dashboard-card">
        <p className="postal-dashboard-muted">Loading platform analytics…</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="postal-dashboard-empty">
        Could not load platform analytics.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="postal-dashboard-card">
        <p className="postal-dashboard-label">Deployment</p>
        <p className="postal-dashboard-stat-value mt-2 capitalize">
          {stats.mode} mode
        </p>
        <p className="postal-dashboard-muted mt-1 text-sm">
          Runtime environment for this Mailprex instance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Total users" value={stats.users.total} />
        <AdminStatCard
          label="Verified users"
          value={stats.users.verified}
          valueClassName="text-emerald-600 dark:text-emerald-400"
        />
        <AdminStatCard
          label="Signups (30d)"
          value={stats.users.signupsLast30d}
        />
        <AdminStatCard label="Total sends" value={stats.sends.total} />
        <AdminStatCard
          label="Sends (24h)"
          value={stats.sends.last24h}
          valueClassName="text-primary dark:text-accent"
        />
        <AdminStatCard label="Sends (30d)" value={stats.sends.last30d} />
        <AdminStatCard
          label="Failed sends"
          value={stats.sends.failed}
          valueClassName="text-rose-600 dark:text-rose-400"
        />
        <AdminStatCard
          label="Sent OK"
          value={stats.sends.byStatus.sent ?? 0}
          valueClassName="text-emerald-600 dark:text-emerald-400"
        />
      </div>

      <div className="postal-dashboard-card">
        <p className="postal-dashboard-label mb-4">Users by plan</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="postal-dashboard-muted mb-1 text-sm">Free</p>
            <p className="postal-dashboard-stat-value">
              {stats.users.byPlan.free}
            </p>
          </div>
          <div>
            <p className="postal-dashboard-muted mb-1 text-sm">Pro</p>
            <p className="postal-dashboard-stat-value text-primary dark:text-accent">
              {stats.users.byPlan.standard}
            </p>
          </div>
          <div>
            <p className="postal-dashboard-muted mb-1 text-sm">Business</p>
            <p className="postal-dashboard-stat-value">
              {stats.users.byPlan.business}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatsPanel;

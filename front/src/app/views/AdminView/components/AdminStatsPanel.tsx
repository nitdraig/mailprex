"use client";

import { AdminPlatformStats } from "@/app/api/admin";

type AdminStatsPanelProps = {
  stats: AdminPlatformStats | null;
  loading: boolean;
};

const StatCard = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) => (
  <div className="postal-dashboard-card">
    <p className="postal-dashboard-label">{label}</p>
    <p className="postal-dashboard-stat mt-1">{value}</p>
    {hint ? <p className="postal-dashboard-muted mt-1 text-xs">{hint}</p> : null}
  </div>
);

const AdminStatsPanel = ({ stats, loading }: AdminStatsPanelProps) => {
  if (loading) {
    return (
      <p className="postal-dashboard-muted">Loading platform analytics…</p>
    );
  }

  if (!stats) {
    return (
      <p className="postal-dashboard-muted">Could not load platform analytics.</p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="postal-dashboard-label mb-1">Deployment</p>
        <p className="postal-dashboard-title capitalize">{stats.mode} mode</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={stats.users.total} />
        <StatCard label="Verified users" value={stats.users.verified} />
        <StatCard
          label="Signups (30d)"
          value={stats.users.signupsLast30d}
        />
        <StatCard label="Total sends" value={stats.sends.total} />
        <StatCard label="Sends (24h)" value={stats.sends.last24h} />
        <StatCard label="Sends (30d)" value={stats.sends.last30d} />
        <StatCard label="Failed sends" value={stats.sends.failed} />
        <StatCard
          label="Sent OK"
          value={stats.sends.byStatus.sent ?? 0}
        />
      </div>

      <div className="postal-dashboard-card">
        <p className="postal-dashboard-label mb-3">Users by plan</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Free" value={stats.users.byPlan.free} />
          <StatCard label="Pro" value={stats.users.byPlan.standard} />
          <StatCard label="Business" value={stats.users.byPlan.business} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsPanel;

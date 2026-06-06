type AdminStatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  valueClassName?: string;
};

const AdminStatCard = ({
  label,
  value,
  hint,
  valueClassName = "text-slate-900 dark:text-slate-50",
}: AdminStatCardProps) => (
  <div className="postal-dashboard-card">
    <p className="postal-dashboard-label">{label}</p>
    <p className={`postal-dashboard-stat-value mt-2 ${valueClassName}`}>
      {value}
    </p>
    {hint ? (
      <p className="postal-dashboard-muted mt-1 text-xs">{hint}</p>
    ) : null}
  </div>
);

export default AdminStatCard;

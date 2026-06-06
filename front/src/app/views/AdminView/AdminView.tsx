"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AdminPlatformStats,
  AdminSend,
  AdminUser,
  Pagination,
  deleteAdminUser,
  fetchAdminSends,
  fetchAdminStats,
  fetchAdminUsers,
  revokeAdminUserToken,
  updateAdminUser,
} from "@/app/api/admin";
import AdminStatsPanel from "./components/AdminStatsPanel";
import AdminUsersPanel from "./components/AdminUsersPanel";
import AdminSendsPanel from "./components/AdminSendsPanel";

type AdminTab = "overview" | "users" | "sends";

const tabs: { id: AdminTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "sends", label: "Deliveries" },
];

const AdminView = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [stats, setStats] = useState<AdminPlatformStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersPagination, setUsersPagination] = useState<Pagination | null>(
    null
  );
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);

  const [sends, setSends] = useState<AdminSend[]>([]);
  const [sendsPagination, setSendsPagination] = useState<Pagination | null>(
    null
  );
  const [sendsLoading, setSendsLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState("");
  const [sendPage, setSendPage] = useState(1);

  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    setError(null);
    try {
      setStats(await fetchAdminStats());
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Failed to load stats"
      );
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    setError(null);
    try {
      const data = await fetchAdminUsers({ page: userPage, search: userSearch });
      setUsers(data.users);
      setUsersPagination(data.pagination);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Failed to load users"
      );
    } finally {
      setUsersLoading(false);
    }
  }, [userPage, userSearch]);

  const loadSends = useCallback(async () => {
    setSendsLoading(true);
    setError(null);
    try {
      const data = await fetchAdminSends({
        page: sendPage,
        status: sendStatus || undefined,
      });
      setSends(data.sends);
      setSendsPagination(data.pagination);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Failed to load sends"
      );
    } finally {
      setSendsLoading(false);
    }
  }, [sendPage, sendStatus]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    }
  }, [activeTab, loadUsers]);

  useEffect(() => {
    if (activeTab === "sends") {
      loadSends();
    }
  }, [activeTab, loadSends]);

  const handleUpdateUser = async (
    userId: string,
    payload: Partial<Pick<AdminUser, "userType" | "verified" | "requestCount">>
  ) => {
    try {
      await updateAdminUser(userId, payload);
      await loadUsers();
      await loadStats();
    } catch (updateError) {
      setError(
        updateError instanceof Error ? updateError.message : "Update failed"
      );
    }
  };

  const handleRevokeToken = async (userId: string) => {
    if (!window.confirm("Revoke this user's form token?")) return;
    try {
      await revokeAdminUserToken(userId);
      await loadUsers();
    } catch (revokeError) {
      setError(
        revokeError instanceof Error ? revokeError.message : "Revoke failed"
      );
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await deleteAdminUser(userId);
      await loadUsers();
      await loadStats();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Delete failed"
      );
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-4">
      <div className="postal-dashboard-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="postal-dashboard-label">Platform control</p>
            <h2 className="postal-dashboard-title mt-1">Admin console</h2>
            <p className="postal-dashboard-muted mt-1 text-sm">
              Analytics, user management, and delivery monitoring.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`postal-dashboard-tab ${
                  activeTab === tab.id
                    ? "postal-dashboard-tab-active"
                    : "postal-dashboard-tab-inactive"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {activeTab === "overview" ? (
        <AdminStatsPanel stats={stats} loading={statsLoading} />
      ) : null}

      {activeTab === "users" ? (
        <AdminUsersPanel
          users={users}
          pagination={usersPagination}
          loading={usersLoading}
          search={userSearch}
          onSearchChange={setUserSearch}
          onSearchSubmit={() => {
            setUserPage(1);
            loadUsers();
          }}
          onPageChange={setUserPage}
          onUpdateUser={handleUpdateUser}
          onRevokeToken={handleRevokeToken}
          onDeleteUser={handleDeleteUser}
        />
      ) : null}

      {activeTab === "sends" ? (
        <AdminSendsPanel
          sends={sends}
          pagination={sendsPagination}
          loading={sendsLoading}
          statusFilter={sendStatus}
          onStatusFilterChange={(value) => {
            setSendStatus(value);
            setSendPage(1);
          }}
          onPageChange={setSendPage}
        />
      ) : null}
    </section>
  );
};

export default AdminView;

"use client";

import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAuthReady, userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (isAuthReady && isAuthenticated && !userData?.isAdmin) {
      router.replace("/dashboard");
    }
  }, [isAuthReady, isAuthenticated, userData?.isAdmin, router]);

  if (!isAuthReady) {
    return (
      <div className="postal-dashboard-shell flex min-h-dvh items-center justify-center">
        <div className="postal-dashboard-card text-center">
          <p className="postal-dashboard-label mb-2">Loading</p>
          <p className="postal-dashboard-title">Checking admin access</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !userData?.isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;

"use client";

import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isAuthReady, router]);

  if (!isAuthReady) {
    return (
      <div className="postal-dashboard-shell flex min-h-dvh items-center justify-center">
        <div className="postal-dashboard-card text-center">
          <p className="postal-eyebrow-dark mb-2">Loading</p>
          <p className="postal-dashboard-title">Preparing your dashboard</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

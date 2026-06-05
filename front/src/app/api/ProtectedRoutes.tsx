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
      <div className="flex min-h-screen items-center justify-center bg-accent dark:bg-secondary">
        <p className="text-secondary dark:text-accent">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

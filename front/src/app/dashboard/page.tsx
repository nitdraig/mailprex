import React from "react";
import type { Metadata } from "next";
import DashboardView from "../views/DashboardView/DashboardView";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../api/ProtectedRoutes";

export const metadata: Metadata = {
  title: "Dashboard | Mailprex",
};

const Page: React.FC = () => {
  return (
    <>
      <ProtectedRoute>
        <DashboardLayout>
          <DashboardView />
        </DashboardLayout>
      </ProtectedRoute>
    </>
  );
};

export default Page;

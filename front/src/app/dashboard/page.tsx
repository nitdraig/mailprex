import React from "react";
import DashboardView from "../views/DashboardView/DashboardView";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../api/ProtectedRoutes";

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

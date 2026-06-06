import type { Metadata } from "next";
import AdminView from "../../views/AdminView/AdminView";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProtectedRoute from "../../api/ProtectedRoutes";
import AdminProtectedRoute from "../../api/AdminProtectedRoute";

export const metadata: Metadata = {
  title: "Admin | Mailprex",
};

const Page = () => {
  return (
    <ProtectedRoute>
      <AdminProtectedRoute>
        <DashboardLayout>
          <AdminView />
        </DashboardLayout>
      </AdminProtectedRoute>
    </ProtectedRoute>
  );
};

export default Page;

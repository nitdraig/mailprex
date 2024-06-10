import React from "react";
import FormTokenManager from "./FormTokenManager/FormTokenManager";
import DashboardSideBar from "./Components/DashboardSideBar";
import { AuthProvider } from "@/app/api/AuthContext";

const DashboardView = () => {
  return (
    <>
      <title>Dashboard | Mailprex </title>
      <div className="h-screen w-full flex overflow-hidden select-none">
        <DashboardSideBar />
        <div className="pt-24">
          <h4>Dashboard</h4>
          <FormTokenManager />
        </div>
      </div>
    </>
  );
};

export default DashboardView;

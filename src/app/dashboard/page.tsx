import React from "react";
import DashboardView from "../views/DashboardView/DashboardView";
import { AuthProvider } from "../api/AuthContext";

const Page: React.FC = () => {
  return (
    <>
      <DashboardView />
    </>
  );
};

export default Page;

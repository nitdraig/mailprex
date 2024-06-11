import React from "react";
import DashboardView from "../views/DashboardView/DashboardView";
import DashboardLayout from "../layouts/DashboardLayout";

const Page: React.FC = () => {
  return (
    <>
      <DashboardLayout>
        <DashboardView />
      </DashboardLayout>
    </>
  );
};

export default Page;

import DashboardLayout from "@/app/layouts/DashboardLayout";
import DashboardView from "@/app/views/DashboardView/DashboardView";
import StatisticsView from "@/app/views/StatisticsView/StatisticsView";
import React from "react";

const Page: React.FC = () => {
  return (
    <>
      <DashboardLayout>
        <StatisticsView />
      </DashboardLayout>
    </>
  );
};

export default Page;

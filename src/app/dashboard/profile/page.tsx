import DashboardLayout from "@/app/layouts/DashboardLayout";
import ProfileandStatisticsView from "@/app/views/ProfileandStatisticsView/ProfileandStatisticsView";

import React from "react";

const page = () => {
  return (
    <>
      <DashboardLayout>
        <ProfileandStatisticsView />
      </DashboardLayout>
      ;
    </>
  );
};

export default page;

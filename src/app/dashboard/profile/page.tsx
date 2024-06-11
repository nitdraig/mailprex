import DashboardLayout from "@/app/layouts/DashboardLayout";
import ProfileView from "@/app/views/ProfileView/ProfileView";
import React from "react";

const page = () => {
  return (
    <>
      <DashboardLayout>
        <ProfileView />
      </DashboardLayout>
      ;
    </>
  );
};

export default page;

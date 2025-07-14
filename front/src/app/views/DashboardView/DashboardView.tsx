"use client";
import React from "react";
import ProfileAndStadisticView from "./ProfileAndStadistics/ProfileAndStadistics";

const DashboardView = () => {
  return (
    <>
      <title>Dashboard | Mailprex</title>
      <section className="lg:h-screen w-full flex mb-10  justify-center bg-accent dark:bg-secondary">
        <ProfileAndStadisticView />
      </section>
    </>
  );
};

export default DashboardView;

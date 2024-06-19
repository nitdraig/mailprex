"use client";
import React from "react";
import ProfileandStatisticsView from "../ProfileandStatisticsView/ProfileandStatisticsView";

const DashboardView = () => {
  return (
    <>
      <title>Dashboard | Mailprex</title>
      <section className="lg:h-screen w-full flex mb-10  justify-center bg-accent dark:bg-secondary">
        <ProfileandStatisticsView />
      </section>
    </>
  );
};

export default DashboardView;

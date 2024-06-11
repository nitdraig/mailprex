import React from "react";
import FormTokenManager from "./FormTokenManager/FormTokenManager";

const DashboardView = () => {
  return (
    <>
      <title>Dashboard | Mailprex </title>
      <div className="h-screen w-full flex overflow-hidden select-none">
        <FormTokenManager />
      </div>
    </>
  );
};

export default DashboardView;

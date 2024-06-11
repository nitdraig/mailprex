import React from "react";
import FormTokenManager from "./FormTokenManager/FormTokenManager";

const DashboardView = () => {
  return (
    <>
      <title>Dashboard | Mailprex</title>
      <section className="h-screen w-full flex  justify-center bg-accent dark:bg-secondary">
        <FormTokenManager />
      </section>
    </>
  );
};

export default DashboardView;

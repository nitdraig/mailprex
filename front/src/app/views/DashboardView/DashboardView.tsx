import React from "react";
import ProfileAndStadisticView from "./ProfileAndStadistics/ProfileAndStadistics";

const DashboardView = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProfileAndStadisticView />
    </div>
  );
};

export default DashboardView;

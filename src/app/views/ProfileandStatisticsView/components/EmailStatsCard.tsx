import React from "react";
import { ImStatsBars } from "react-icons/im";

const EmailStats = ({ sentEmails, remainingEmails }: any) => {
  return (
    <div>
      <div className="mt-4 text-left relative z-10 space-y-2">
        <div className="text-center flex items-center">
          <h3 className="lg:text-3xl text-2xl  font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">
            Your Stats
          </h3>
          <ImStatsBars className="w-16 h-16 dark:text-accent text-primary ml-8 mb-2" />
        </div>
        <p className="dark:text-gray-300  text-xl text-gray-700">
          Total Sent Emails:
          <span className="text-green-500 font-bold"> {sentEmails}</span>
        </p>
        <p className="dark:text-gray-300  text-xl text-gray-700">
          Total Remaining Emails:
          <span className="text-red-500 font-bold"> {remainingEmails}</span>
        </p>
      </div>
    </div>
  );
};

export default EmailStats;

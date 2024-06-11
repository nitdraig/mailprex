"use client";
import { useAuth } from "@/app/api/AuthContext";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const StatisticsView = () => {
  const { userData } = useAuth();

  const [sentEmails, setSentEmails] = useState(0);
  const [remainingEmails, setRemainingEmails] = useState<string | number>(0);
  const [lastEmailDate, setLastEmailDate] = useState("");
  const [userPlan, setUserPlan] = useState("Free");

  const upgradePlan = () => {
    if (userPlan === "Free") {
      setUserPlan("Standard");
    } else if (userPlan === "Standard") {
      setUserPlan("Business");
    }
  };

  useEffect(() => {
    if (userData) {
      setSentEmails(userData.requestCount);
      setLastEmailDate(format(new Date(userData.lastRequest), "yyyy-MM-dd "));
      switch (userData.userType.toLowerCase()) {
        case "free":
          setRemainingEmails(200 - userData.requestCount);
          break;
        case "standard":
          setRemainingEmails(2000 - userData.requestCount);
          break;
        case "business":
          setRemainingEmails("∞");
          break;
        default:
          setRemainingEmails(0);
      }
    }
  }, [userData]);

  return (
    <div className="container mx-auto p-4 flex flex-wrap justify-center gap-8">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs mx-auto my-4 rounded-lg shadow-md p-5 bg-white dark:bg-gray-800">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src="https://picsum.photos/200"
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3">
          {userData?.name} {userData?.lastName}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-1">
          {userData?.email}
        </p>
        <div className="flex flex-col items-center mt-5">
          <p className="text-gray-700 dark:text-gray-200">Your Plan</p>
          <p className="font-bold text-lg mb-2">{userPlan}</p>
          <button
            onClick={upgradePlan}
            className="bg-blue-500 text-white text-sm py-2 px-4 rounded-lg mt-4"
          >
            Upgrade
          </button>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs mx-auto my-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
          <div className="h-20 bg-red-400 flex items-center justify-between p-5">
            <p className="text-white text-lg">Sent Emails</p>
          </div>
          <div className="px-5 pt-6 mb-2 text-gray-700 dark:text-gray-200">
            <p className="font-bold">TOTAL:</p>
            <p className="py-4 text-3xl text-center text-black dark:text-white">
              {sentEmails}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs mx-auto my-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
          <div className="h-20 bg-blue-500 flex items-center justify-between p-5">
            <p className="text-white text-lg">Remaining Emails</p>
          </div>
          <div className="px-5 pt-6 mb-2 text-gray-700 dark:text-gray-200">
            <p className="font-bold">TOTAL:</p>
            <p className="py-4 text-3xl text-center text-black dark:text-white">
              {remainingEmails}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs mx-auto my-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
          <div className="h-20 bg-purple-400 flex items-center justify-between p-5">
            <p className="text-white text-lg">Your Last Email</p>
          </div>
          <div className="px-5 pt-6 mb-2 text-gray-700 dark:text-gray-200">
            <p className="font-bold">Date:</p>
            <p className="py-4 text-3xl text-center text-black dark:text-white">
              {lastEmailDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsView;

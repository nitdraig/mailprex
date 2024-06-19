"use client";
import { useAuth } from "@/app/api/AuthContext";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  deleteFormToken,
  generateFormToken,
  getFormToken,
} from "@/app/api/api";

import FormTokenManagmentCard from "./components/FormTokenManagmentCard";
import LastSentCard from "./components/LastSentCard";
import UserPlanCard from "./components/UserPlanCard";
import EmailStats from "./components/EmailStatsCard";
import UserCard from "./UserCard/UserCard";

const ProfileandStatisticsView = () => {
  const { userData, token, email } = useAuth();

  const [sentEmails, setSentEmails] = useState(0);
  const [remainingEmails, setRemainingEmails] = useState<string | number>(0);
  const [lastEmailDate, setLastEmailDate] = useState("");
  const [formToken, setFormToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const JWT = token!;
  const EMAIL = email!;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await getFormToken(JWT);
        setFormToken(token);
        setError(null);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateToken = async () => {
    setLoading(true);
    try {
      const token = await generateFormToken(JWT, EMAIL);
      setFormToken(token);
      setError(null);
    } catch (error) {
      setError("Error al generar el token del formulario");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteToken = async () => {
    setLoading(true);
    try {
      await deleteFormToken(JWT, EMAIL);
      setFormToken(null);
      setError(null);
    } catch (error) {
      setError("Error al eliminar el token del formulario");
    } finally {
      setLoading(false);
    }
  };
  const upgradePlan = () => {};

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
    <section>
      <title>Profile & Stats | Mailprex</title>
      <div className="lg:-mt-8 py-4 ">
        <div className="lg:mx-auto -mx-4 lg:px-6 px-0 max-w-6xl text-gray-500">
          <h3 className="lg:text-5xl text-4xl font-thin mb-4 dark:text-white text-center">
            Welcome {userData?.name}!
          </h3>
          <div className="relative">
            <div className="relative z-10 grid gap-3 grid-cols-6">
              <div className="col-span-full sm:col-span-2 lg:col-span-2 overflow-hidden relative p-8 rounded-lg bg-white border border-gray-200 dark:border-gray-800 dark:bg-primary">
                <UserCard userData={userData} lastEmailDate={lastEmailDate} />
              </div>
              <div className="col-span-full lg:col-span-4 overflow-hidden relative p-8 rounded-lg bg-white border border-gray-200 dark:border-gray-800 dark:bg-primary">
                <FormTokenManagmentCard
                  formToken={formToken}
                  loading={loading}
                  error={error}
                  generateToken={generateToken}
                  handleDeleteToken={handleDeleteToken}
                />
              </div>
              <div className="col-span-full lg:col-span-2 overflow-hidden relative p-8 rounded-lg bg-white border border-gray-200 dark:border-gray-800 dark:bg-primary">
                <EmailStats
                  sentEmails={sentEmails}
                  remainingEmails={remainingEmails}
                />
              </div>
              <div className="col-span-full lg:col-span-2 overflow-hidden flex relative p-8 rounded-lg bg-white border border-gray-200 dark:border-gray-800 dark:bg-primary">
                <UserPlanCard
                  userPlan={userData?.userType}
                  upgradePlan={upgradePlan}
                />
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-lg bg-white border border-gray-200 dark:border-gray-800 dark:bg-primary">
                <LastSentCard lastEmailDate={lastEmailDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileandStatisticsView;

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
import LegacyTokenBanner from "@/app/components/DashboardComponents/LegacyTokenBanner";
import LastSentCard from "./components/LastSentCard";
import UserPlanCard from "./components/UserPlanCard";
import EmailStats from "./components/EmailStatsCard";
import UserCard from "./components/UserCard/UserCard";

const ProfileAndStadisticView = () => {
  const { userData, email, isAuthenticated } = useAuth();

  const [sentEmails, setSentEmails] = useState(0);
  const [remainingEmails, setRemainingEmails] = useState<string | number>(0);
  const [lastEmailDate, setLastEmailDate] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [tokenPrefix, setTokenPrefix] = useState<string | undefined>();
  const [revealedToken, setRevealedToken] = useState<string | null>(null);
  const [legacyToken, setLegacyToken] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const status = await getFormToken();
        setHasToken(status.hasToken);
        setTokenPrefix(status.prefix);
        setLegacyToken(Boolean(status.legacy));
        setRevealedToken(null);
        setError(null);
      } catch {
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const generateToken = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const result = await generateFormToken(email);
      setHasToken(true);
      setTokenPrefix(result.prefix);
      setRevealedToken(result.formToken);
      setLegacyToken(false);
      setError(null);
    } catch {
      setError("Failed to generate form token");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteToken = async () => {
    if (!email) return;

    setLoading(true);
    try {
      await deleteFormToken(email);
      setHasToken(false);
      setTokenPrefix(undefined);
      setRevealedToken(null);
      setLegacyToken(false);
      setError(null);
    } catch {
      setError("Failed to delete form token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData?.lastRequest) return;

    setSentEmails(userData.requestCount);
    setLastEmailDate(format(new Date(userData.lastRequest), "yyyy-MM-dd"));
    switch (userData.userType.toLowerCase()) {
      case "free":
        setRemainingEmails(200 - userData.requestCount);
        break;
      case "standard":
        setRemainingEmails(5000 - userData.requestCount);
        break;
      case "business":
        setRemainingEmails("∞");
        break;
      default:
        setRemainingEmails(0);
    }
  }, [userData]);

  return (
    <section className="mx-auto flex h-full w-full max-w-5xl flex-col lg:min-h-0">
      <div className="grid auto-rows-min grid-cols-1 gap-1.5 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:content-start">
        <div className="postal-dashboard-card lg:col-span-3">
          <UserCard userData={userData} lastEmailDate={lastEmailDate} compact />
        </div>

        <div className="postal-dashboard-card lg:col-span-9">
          {legacyToken && hasToken && !revealedToken ? (
            <LegacyTokenBanner onRegenerate={generateToken} />
          ) : null}
          <FormTokenManagmentCard
            hasToken={hasToken}
            tokenPrefix={tokenPrefix}
            revealedToken={revealedToken}
            loading={loading}
            error={error}
            generateToken={generateToken}
            handleDeleteToken={handleDeleteToken}
            compact
          />
        </div>

        <div className="postal-dashboard-card lg:col-span-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-200 dark:sm:divide-white/[0.08]">
            <div className="sm:pr-3">
              <EmailStats
                sentEmails={sentEmails}
                remainingEmails={remainingEmails}
                compact
              />
            </div>
            <div className="sm:px-3">
              <UserPlanCard userPlan={userData?.userType} compact />
            </div>
            <div className="sm:pl-3">
              <LastSentCard lastEmailDate={lastEmailDate} compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileAndStadisticView;

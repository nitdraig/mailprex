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
    <section className="mx-auto max-w-6xl">
      <div className="mb-8 text-center sm:text-left">
        <p className="postal-eyebrow-dark mb-2">Welcome back</p>
        <h2 className="text-3xl font-bold uppercase tracking-[0.05em] text-primary dark:text-white sm:text-4xl">
          {userData?.name}
        </h2>
        <p className="mt-2 text-secondary/70 dark:text-accent/80">
          Manage your routes, tokens, and delivery stats.
        </p>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="postal-dashboard-card col-span-full sm:col-span-2 lg:col-span-2">
          <UserCard userData={userData} lastEmailDate={lastEmailDate} />
        </div>

        <div className="postal-dashboard-card col-span-full lg:col-span-4">
          {legacyToken && hasToken && !revealedToken && (
            <LegacyTokenBanner onRegenerate={generateToken} />
          )}
          <FormTokenManagmentCard
            hasToken={hasToken}
            tokenPrefix={tokenPrefix}
            revealedToken={revealedToken}
            loading={loading}
            error={error}
            generateToken={generateToken}
            handleDeleteToken={handleDeleteToken}
          />
        </div>

        <div className="postal-dashboard-card col-span-full lg:col-span-2">
          <EmailStats
            sentEmails={sentEmails}
            remainingEmails={remainingEmails}
          />
        </div>

        <div className="postal-dashboard-card col-span-full flex lg:col-span-2">
          <UserPlanCard userPlan={userData?.userType} />
        </div>

        <div className="postal-dashboard-card col-span-full sm:col-span-3 lg:col-span-2">
          <LastSentCard lastEmailDate={lastEmailDate} />
        </div>
      </div>
    </section>
  );
};

export default ProfileAndStadisticView;

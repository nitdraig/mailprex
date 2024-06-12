import TokenActions from "@/app/components/DashboardComponents/TokenActions";
import Link from "next/link";
import React from "react";

const FormTokenManagmentCard = ({
  loading,
  error,
  formToken,
  generateToken,
  handleDeleteToken,
}: any) => {
  return (
    <div className="grid sm:grid-cols-1">
      <div className="flex flex-col justify-between relative z-10 space-y-12 lg:space-y-6">
        <div className="space-y-2 ">
          <h2 className="text-xl font-bold text-center text-gray-800 transition group-hover:text-purple-950 dark:text-white">
            Form Token Management
          </h2>
          <div>
            <p className="dark:text-gray-200 text-lg font-thin text-secondary text-center mb-4">
              Remember see the {""}
              <Link
                className="text-blue-700 dark:text-blue-300 pointer"
                prefetch
                href="/docs/introduction"
              >
                Mailprex Docs
              </Link>
              , and not share your form token, is private.
            </p>
          </div>
          <p className="dark:text-gray-300 text-gray-700">
            <div>
              {loading && (
                <p className="text-gray-500 text-center">Loading...</p>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}
              <TokenActions
                formToken={formToken}
                generateFormToken={generateToken}
                deleteFormToken={handleDeleteToken}
              />
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormTokenManagmentCard;

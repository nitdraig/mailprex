import React from "react";

const StatisticCard = ({ title, value, color, children, isPlan }: any) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
      <div
        className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer ${color}`}
      >
        <div className="h-20 flex items-center justify-between">
          <p className="mr-0 text-white text-lg pl-5">{title}</p>
        </div>
        <div className="px-5 pt-6 mb-2 text-sm text-gray-600">
          <p className="font-bold">{isPlan ? null : "TOTAL"}</p>
        </div>
        <p className="py-4 text-3xl text-center">{value}</p>
        {children}
      </div>
    </div>
  );
};

export default StatisticCard;

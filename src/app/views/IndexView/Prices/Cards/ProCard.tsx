import React from "react";

const ProCard = () => {
  return (
    <div className="lg:w-[23rem] bg-white w-full lg:my-0 my-4 border-2 border-primary p-5 rounded-2xl lg:shadow-8">
      <div className="pb-3 mb-4 border-b border-gray-200">
        <div className="text-xs text-slate-800 mb-2">PRO</div>
        <div className="flex items-center">
          <h2 className="text-5xl m-0 font-normal">$38</h2>
          <span className="text-slate-300 ml-1">/mo</span>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <svg
          width="24"
          height="24"
          fill="none"
          className="text-green-500 mr-1"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
          ></path>
        </svg>
        10k Visitors/mo
      </div>
      <div className="flex items-center mb-2">
        <svg
          width="24"
          height="24"
          fill="none"
          className="text-green-500 mr-1"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
          ></path>
        </svg>
        10 Funnels, 100 Pages
      </div>
      <div className="flex items-center mb-2">
        <svg
          width="24"
          height="24"
          fill="none"
          className="text-green-500 mr-1"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
          ></path>
        </svg>
        Unlimited Transactions
      </div>
      <div className="flex items-center mb-2">
        <svg
          width="24"
          height="24"
          fill="none"
          className="text-green-500 mr-1"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
          ></path>
        </svg>
        Analytics
      </div>
      <div className="flex items-center mb-5">
        <svg
          width="24"
          height="24"
          fill="none"
          className="text-green-500 mr-1"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
          ></path>
        </svg>
        lnstegrations
      </div>
      <div className="mt-auto w-full">
        <button className="bg-teal-500 rounded-xl cursor-pointer text-white py-2 border-none w-full flex items-center px-3">
          Get Pro
          <svg
            className="ml-auto"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M13.75 6.75L19.25 12L13.75 17.25"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M19 12H4.75"
            ></path>
          </svg>
        </button>
        <div className="text-xs mt-3 text-slate-600 line-height-2">
          Literally you probably havent heard of them jean shorts.
        </div>
      </div>
    </div>
  );
};

export default ProCard;

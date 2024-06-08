import React from "react";

const FreeCard = () => {
  return (
    <div className="lg:w-[23rem] bg-white w-full border-2 lg:border-r-0 border-primary p-5 rounded-2xl lg:rounded-r-none">
      <div className="pb-3 mb-4 border-b border-gray-200">
        <div className="text-xs text-slate-800 mb-2">START</div>
        <h2 className="text-5xl m-0 font-normal">Free</h2>
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
        200 sends per month
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
        Private token
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
        Control your remaining shipments
      </div>
      <div className="mt-auto w-full">
        <button className="bg-secondary hover:bg-primary transition duration-300 rounded-xl cursor-pointer text-white py-2 border-none w-full flex items-center px-3">
          Get Free
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
      </div>
    </div>
  );
};

export default FreeCard;

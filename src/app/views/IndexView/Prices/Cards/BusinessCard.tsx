import SVGArrowCheck from "@/app/components/IndexComponents/SVGArrowCheck";
import SVGCheck from "@/app/components/IndexComponents/SVGCheck";
import React from "react";

const BusinessCard = () => {
  return (
    <div className="lg:w-[23rem] bg-white w-full border-2 lg:border-l-0 border-primary p-5 rounded-2xl lg:rounded-l-none">
      <div className="pb-3 mb-4 border-b border-gray-200">
        <div className="text-xs text-slate-800 mb-2">BUSINESS</div>
        <div className="flex items-center">
          {/* <h2 className="text-5xl m-0 font-normal">$40</h2>
          <span className="text-slate-800 ml-1">/mo</span> */}
          <h2 className="text-5xl m-0 font-normal">Coming Soon</h2>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <SVGCheck />
        Ilimited sends
      </div>
      <div className="flex items-center mb-2">
        <SVGCheck />
        PRO plan benefits
      </div>
      <div className="flex items-center mb-5">
        <SVGCheck />
        Personalized attention
      </div>
      <div className="mt-auto w-full">
        <button
          disabled
          className="bg-secondary hover:bg-primary transition duration-300 rounded-xl cursor-pointer text-white py-2 border-none w-full flex items-center px-3"
        >
          Get Business
          <SVGArrowCheck />
        </button>
        <div className="text-xs mt-3 text-slate-600 line-height-2">
          Literally you probably havent heard of them jean shorts.
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;

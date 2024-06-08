import SVGArrowCheck from "@/app/components/IndexComponents/SVGArrowCheck";
import SVGCheck from "@/app/components/IndexComponents/SVGCheck";
import React from "react";

const ProCard = () => {
  return (
    <div className="lg:w-[23rem] bg-white w-full lg:my-0 my-4 border-2 border-primary p-5 rounded-2xl lg:shadow-8">
      <div className="pb-3 mb-4 border-b border-gray-200">
        <div className="text-xs text-slate-800 mb-2">PRO</div>
        <div className="flex items-center">
          <h2 className="text-5xl m-0 font-normal">$10</h2>
          <span className="text-slate-800 ml-1">/mo</span>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <SVGCheck />
        2000 sends per month
      </div>
      <div className="flex items-center mb-2">
        <SVGCheck />
        Ilimited creation and delete of tokens
      </div>
      <div className="flex items-center mb-2">
        <SVGCheck />
        Control your remaining shipments
      </div>
      <div className="flex items-center mb-2">
        <SVGCheck />
        Analytics
      </div>
      <div className="flex items-center mb-5">
        <SVGCheck />
        Free Forms Templates
      </div>
      <div className="mt-auto w-full">
        <button className="bg-primary hover:bg-accent hover:text-secondary transition duration-300 rounded-xl cursor-pointer text-white py-2 border-none w-full flex items-center px-3">
          Get Pro
          <SVGArrowCheck />
        </button>
      </div>
    </div>
  );
};

export default ProCard;

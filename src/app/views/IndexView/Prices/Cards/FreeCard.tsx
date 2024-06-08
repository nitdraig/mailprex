import SVGCheck from "@/app/components/IndexComponents/SVGCheck";
import SVGArrowCheck from "@/app/components/IndexComponents/SVGArrowCheck";
import React from "react";

const FreeCard = () => {
  return (
    <div className="lg:w-[23rem] bg-white w-full border-2 lg:border-r-0 border-primary p-5 rounded-2xl lg:rounded-r-none">
      <div className="pb-3 mb-4 border-b border-gray-200">
        <div className="text-xs text-slate-800 mb-2">START</div>
        <h2 className="text-5xl m-0 font-normal">Free</h2>
      </div>
      <div className="flex items-center mb-2">
        <SVGCheck />
        200 sends per month
      </div>
      <div className="flex items-center mb-2">
        <SVGCheck />
        Private token
      </div>
      <div className="flex items-center mb-5">
        <SVGCheck />
        Control your remaining shipments
      </div>
      <div className="mt-auto w-full">
        <button className="bg-secondary hover:bg-primary transition duration-300 rounded-xl cursor-pointer text-white py-2 border-none w-full flex items-center px-3">
          Get Free
          <SVGArrowCheck />
        </button>
      </div>
    </div>
  );
};

export default FreeCard;

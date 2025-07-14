import React from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";

const FeaturesSection = () => {
  return (
    <section
      className="bg-gradient-to-br from-accent via-primary/90 to-primary py-16 h-full lg:h-screen overflow-hidden"
      id="features"
    >
      <div className="container m-auto px-6 space-y-8  md:px-12">
        <div>
          <span className="text-secondary uppercase text-lg font-semibold">
            Main features
          </span>
          <h2 className="mt-4 text-3xl text-secondary font-bold lg:text-4xl">
            Quick, accessible, economical
            <br className="lg:block" hidden />
            and private
          </h2>
        </div>
        <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8">
              <FaReact className="w-16 h-16 text-primary" />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition ">
                  First feature
                </h5>
                <p className="text-sm text-secondary">
                  Hook for react You import from npm, load the basic data.
                  <br />
                </p>
              </div>
              <a
                href="https://docs.mailprex.excelso.xyz"
                target="_blank"
                className="flex hover:bg-primary py-3 px-2 rounded-lg text-secondary hover:text-accent  justify-between items-center "
              >
                Read more
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <BiArrowToRight />
                </span>
              </a>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8">
              <GrUserAdmin className="w-16 h-16 text-primary" />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition ">
                  Second feature
                </h5>
                <p className="text-sm text-secondary">
                  You can create a sending token, copy the one you have or
                  delete the existing one from the platform.
                </p>
              </div>
              <a
                href="https://docs.mailprex.excelso.xyz"
                target="_blank"
                className="flex hover:bg-primary py-3 px-2 rounded-lg text-secondary hover:text-accent  justify-between items-center "
              >
                Read more
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <BiArrowToRight />
                </span>
              </a>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8">
              <MdQueryStats className="w-16 h-16 text-primary" />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition ">
                  Third feature
                </h5>
                <p className="text-sm text-secondary">
                  Control the number of messages you have left, renew your plan
                  or unsubscribe.
                </p>
              </div>
              <a
                href="https://docs.mailprex.excelso.xyz"
                target="_blank"
                className="flex hover:bg-primary py-3 px-2 rounded-lg text-secondary hover:text-accent  justify-between items-center "
              >
                Read more
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <BiArrowToRight />
                </span>
              </a>
            </div>
          </div>
          <div className="relative group bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
            <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
              <IoDocumentText className="w-16 h-16 text-primary" />
              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition ">
                  Read Documentation
                </h5>
                <p className="text-sm text-secondary">
                  Read the documentation: easy access, implementation,
                  lightweight, fast.
                </p>
              </div>
              <a
                href="https://docs.mailprex.excelso.xyz"
                target="_blank"
                className="flex hover:bg-primary py-3 px-2 rounded-lg text-secondary hover:text-accent  justify-between items-center "
              >
                Read more
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <BiArrowToRight />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

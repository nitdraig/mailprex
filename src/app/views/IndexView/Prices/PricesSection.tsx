import React from "react";
import FreeCard from "./Cards/FreeCard";
import ProCard from "./Cards/ProCard";
import EnterpriseCard from "./Cards/EnterpriseCard";

const PricesSection = () => {
  return (
    <section className="bg-gradient-to-tr from-accent via-primary to-primary  h-full lg:h-screen">
      <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-accent text-center pt-10">
        Our Prices
      </h3>
      <div className="flex lg:flex-row flex-col lg:justify-center items-center lg:p-8 p-4 font-sans ">
        <FreeCard />
        <ProCard />
        <EnterpriseCard />
      </div>
    </section>
  );
};

export default PricesSection;

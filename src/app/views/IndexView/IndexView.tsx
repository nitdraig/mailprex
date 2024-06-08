import React from "react";
import HeroSection from "./Hero/HeroSection";
import AboutSection from "./About/AboutSection";
import FeaturesSection from "./Features/FeaturesSection";
import PricesSection from "./Prices/PricesSection";
import ContactSection from "./Contact/ContactSection";

const IndexView = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PricesSection />
      <ContactSection />
    </>
  );
};

export default IndexView;

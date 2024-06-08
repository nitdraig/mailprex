import React from "react";

const HeroSection = () => {
  return (
    <section
      className={`bg-gradient-to-br from-primary via-primary/90 to-accent text-white h-screen w-full py-20 md:py-32`}
    >
      <div className="mx-auto lg:px-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:text-left text-center mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Mailprex
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Send Emails from your Website with Ease
          </p>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <a
              href="/signup"
              className={`inline-block bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-lg mb-4 md:mb-0 hover:bg-accent/20 transition duration-300`}
            >
              Get Started
            </a>
            <a
              href="/learn-more"
              className={`inline-block bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-accent hover:text-secondary transition duration-300`}
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/email-bg.svg"
            alt="Mailprex illustration"
            className="rounded-lg w-full md:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

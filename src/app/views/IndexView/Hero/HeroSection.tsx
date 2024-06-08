import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary via-primary/90 to-accent text-white h-full lg:h-screen w-full py-20 md:py-32">
      <div className="mx-auto lg:px-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 lg:hidden md:hidden flex justify-center">
          <img
            src="/email-bg.svg"
            alt="Mailprex illustration"
            className="rounded-lg w-full md:max-w-lg "
          />
        </div>
        <div className="md:w-1/2 md:text-left text-center md:mx-2 lg:mt-0 mt-10 mb-8 md:mb-0">
          <h1 className="text-5xl  lg:text-6xl font-bold mb-6 ">Mailprex</h1>
          <p className="text-lg md:text-xl mb-8 mx-6 lg:mx-0">
            We take care of making it easier for you to send forms from your
            website, import the hook, add the data and{" "}
            <span className="font-bold text-2xl ">voilà!</span> Direct to your
            email!
          </p>
          <div className="flex flex-col md:flex-row lg:mx-0 mx-8 md:space-x-4">
            <a
              href="/login"
              className="inline-block bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-lg mb-4 md:mb-0 hover:bg-accent/20 transition duration-300"
            >
              Get Started
            </a>
            <a
              href="/docs/introduction"
              className="inline-block bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-accent hover:text-secondary transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 lg:flex md:flex hidden justify-center">
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

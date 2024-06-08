import React from "react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-tl from-accent via-primary/90 to-primary/80  h-full w-full">
      <div className="container lg:mx-auto  flex flex-col lg:flex-row items-center justify-between lg:px4 px-8">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img src="/grades.svg" alt="About Mailprex" className="" />
        </div>
        <div className="lg:w-1/2">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6 uppercase text-accent">
            About Mailprex
          </h3>
          <p className="text-lg text-accent mb-8">
            Mailprex is a powerful API designed to simplify the process of
            submitting forms from your website to your email. With Mailprex, you
            can easily integrate a hook, to which you pass the minimum data that
            enables sending and the content of the form reaches your chosen
            email without further inconvenience.
          </p>
          <p className="text-lg text-accent mb-8">
            Our mission is to provide a seamless and efficient form submission
            solution for website owners and developers, allowing them to focus
            on their core business activities without worrying about the
            complexities of creating an extra contact form submission service in
            their application, personal website, etc.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

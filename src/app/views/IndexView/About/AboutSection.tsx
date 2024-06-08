import React from "react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-bl from-accent via-primary/90 to-accent h-full w-full">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img src="/grades.svg" alt="About Mailprex" className="" />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-secondary">
            About Mailprex
          </h2>
          <p className="text-lg text-secondary mb-8">
            Mailprex is a powerful platform designed to simplify the process of
            sending emails from your website. With Mailprex, you can easily
            integrate contact forms and other email functionalities into your
            site, allowing you to stay connected with your visitors and
            customers.
          </p>
          <p className="text-lg text-secondary mb-8">
            Our mission is to provide a seamless and efficient email solution
            for website owners and developers, enabling them to focus on their
            core business activities without worrying about the complexities of
            email delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

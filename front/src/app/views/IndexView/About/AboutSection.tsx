import React from "react";

const AboutSection = () => {
  return (
    <section className="postal-section bg-gradient-to-br from-accent/90 via-accent to-accent/80" id="about">
      <div aria-hidden className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />

      <div className="postal-section-inner">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div
              aria-hidden
              className="absolute inset-4 rounded-3xl border border-primary/15 bg-white/40"
            />
            <img
              src="/grades.svg"
              alt="About Mailprex"
              className="relative float w-full max-w-lg mx-auto lg:mx-0"
              loading="lazy"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="postal-eyebrow mb-4 text-primary/60">Our story</p>
            <h2 className="mb-6 text-3xl font-bold uppercase tracking-[0.06em] text-primary lg:text-4xl">
              About Mailprex
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-secondary/85">
              <p>
                Mailprex is a powerful API designed to simplify the process of
                submitting forms from your website to your email. With Mailprex,
                you can easily integrate a hook, pass the minimum data required
                for sending, and the form content reaches your chosen inbox
                without further inconvenience.
              </p>
              <p>
                Our mission is to provide a seamless and efficient form
                submission solution for website owners and developers, allowing
                them to focus on their core business without building an extra
                contact-form delivery service in every application or personal
                website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

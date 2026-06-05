import Form from "@/app/components/IndexComponents/Form";
import React from "react";

const ContactSection = () => {
  return (
    <section className="postal-mesh-bg postal-section" id="contact">
      <div aria-hidden className="postal-grid-overlay absolute inset-0 opacity-50" />

      <div className="postal-section-inner">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-white">
            <p className="postal-eyebrow mb-4 text-accent/75">Contact</p>
            <h2 className="mb-4 text-3xl font-bold uppercase tracking-[0.06em] lg:text-4xl">
              Let&apos;s Talk
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-accent/90">
              Do you have any questions regarding Mailprex? Contact us — we would
              love to help you get your forms delivered.
            </p>
          </div>

          <div className="postal-panel p-6 sm:p-8">
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

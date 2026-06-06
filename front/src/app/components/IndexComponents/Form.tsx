"use client";

import Swal from "sweetalert2";
import { useMailprex } from "usemailprex-react";
import { useEffect, useRef } from "react";

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Form = () => {
  const webName = "Mailprex Landing";
  const emailDestiny = (process.env.NEXT_PUBLIC_EMAIL_DESTINY || "").trim();
  const url = (process.env.NEXT_PUBLIC_API_URL_SEND || "").trim();
  const formToken = (process.env.NEXT_PUBLIC_MAILPREX_FORM_TOKEN || "").trim();
  const awaitingResponse = useRef(false);

  const { formData, handleChange, handleSubmit, response } = useMailprex({
    url,
    webName,
    emailDestiny,
    formToken,
  });

  useEffect(() => {
    if (!awaitingResponse.current || response.loading) {
      return;
    }

    awaitingResponse.current = false;

    if (response.error) {
      Swal.fire({
        title: "Error sending message",
        text: response.error,
        icon: "error",
      });
      return;
    }

    Swal.fire({ title: "Message sent successfully!", icon: "success" });
  }, [response]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formToken) {
      Swal.fire({
        title: "Missing form token",
        text: "Set NEXT_PUBLIC_MAILPREX_FORM_TOKEN in your environment.",
        icon: "error",
      });
      return;
    }

    if (!url) {
      Swal.fire({
        title: "Missing API URL",
        text: "Set NEXT_PUBLIC_API_URL_SEND to your /email/send endpoint.",
        icon: "error",
      });
      return;
    }

    if (!isValidEmail(emailDestiny)) {
      Swal.fire({
        title: "Invalid destination email",
        text: "Set NEXT_PUBLIC_EMAIL_DESTINY to the inbox where form submissions should be delivered.",
        icon: "error",
      });
      return;
    }

    awaitingResponse.current = true;
    await handleSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <p className="postal-eyebrow-dark mb-1">Send a message</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="postal-input sm:col-span-1">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />
        </div>
        <div className="postal-input sm:col-span-1">
          <input
            type="email"
            value={formData.email}
            required
            onChange={handleChange}
            name="email"
            placeholder="Your email"
          />
        </div>
        <div className="postal-input sm:col-span-2 !items-start">
          <textarea
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className="min-h-[120px] resize-y"
            placeholder="Your message"
          />
        </div>
      </div>

      <button type="submit" className="postal-btn-primary mt-2 w-full sm:w-auto">
        Send Message
      </button>
    </form>
  );
};

export default Form;

"use client";

import Swal from "sweetalert2";
import { useState } from "react";
import { createDefaultFormData } from "mailprex";

const Form = () => {
  const [formData, setFormData] = useState(createDefaultFormData());
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        Swal.fire({
          title: "Error sending message",
          text: data.message ?? "Try again later.",
          icon: "error",
        });
        return;
      }

      Swal.fire({ title: "Message sent successfully!", icon: "success" });
      setFormData(createDefaultFormData());
    } catch {
      Swal.fire({
        title: "Error sending message",
        text: "Network error. Try again later.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
      </div>

      <button
        type="submit"
        className="postal-btn-primary mt-2 w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
};

export default Form;

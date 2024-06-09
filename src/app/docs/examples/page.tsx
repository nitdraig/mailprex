import CopyButton from "@/app/components/CopyButton";
import DocsLayout from "@/app/components/DocsComponents/DocsLayout";
import Head from "next/head";

const Page = () => {
  return (
    <DocsLayout>
      <title>Examples | Mailprex Docs</title>

      <div className="lg:pl-0 pl-10">
        <h1 className="text-4xl font-bold">Examples</h1>
        <section>
          <h2 className="text-2xl font-semibold mt-6">Complete Example</h2>
          <p className="mt-4 text-lg">
            Below is a complete example of how to use the{" "}
            <code>useMailprexForm</code> hook on a contact form in a React app.
          </p>
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg overflow-x-auto">
            <CopyButton
              code={`
import React from "react";
import { useMailprex } from "usemailprex";

const ContactForm = () => {
  const webName = "Your Awesome Website";
  const emailDestiny = "emailDestiny@example.com";
  const url = "https://api.mailprex.top/email/send";
  const formToken = "yourTokenFromMailprexApp";
  const { formData, handleChange, handleSubmit, response } = useMailprex({
    url,
    webName,
    emailDestiny,
    formToken,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="fullname"
          className="block text-gray-700 font-semibold mb-2"
        >
          FullName *
        </label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          placeholder="Nombre completo"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
        Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 font-semibold mb-2"
        >
       Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          placeholder="Phone"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="service"
          className="block text-gray-700 font-semibold mb-2"
        >
         Service
        </label>
        <input
          type="text"
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          placeholder="Service"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-700 font-semibold mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          rows={4}
          placeholder="Message"
          required
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold
           px-4 py-2 rounded-md transition-colors duration-300"
        >
          Send
        </button>
      </div>
      {response.loading && (
        <p className="mt-4 text-blue-500">Enviando correo electrónico...</p>
      )}
      {response.error && (
        <p className="mt-4 text-red-500">
          Failed to send email: {response.error.message}
        </p>
      )}
      {response.data && (
        <p className="mt-4 text-green-500">{response.data.message}</p>
      )}
    </form>
  );
};

export default ContactForm;`}
            />
            <code className="mx-auto">
              {`
import React from "react";
import { useMailprex } from "usemailprex";

const ContactForm = () => {
  const webName = "Your Awesome Website";
  const emailDestiny = "emailDestiny@example.com";
  const url = "https://api.mailprex.top/email/send";
  const formToken = "yourTokenFromMailprexApp";
  const { formData, handleChange, handleSubmit, response } = useMailprex({
    url,
    webName,
    emailDestiny,
    formToken,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="fullname"
          className="block text-gray-700 font-semibold mb-2"
        >
          FullName *
        </label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          placeholder="FullName"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
        Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 font-semibold mb-2"
        >
       Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          placeholder="Phone"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="service"
          className="block text-gray-700 font-semibold mb-2"
        >
         Service
        </label>
        <input
          type="text"
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          placeholder="Service"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-700 font-semibold mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md   "
          rows={4}
          placeholder="Message"
          required
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold
           px-4 py-2 rounded-md transition-colors duration-300"
        >
          Send
        </button>
      </div>
      {response.loading && (
        <p className="mt-4 text-blue-500">Send Email...</p>
      )}
      {response.error && (
        <p className="mt-4 text-red-500">
          Failed to send email: {response.error.message}
        </p>
      )}
      {response.data && (
        <p className="mt-4 text-green-500">{response.data.message}</p>
      )}
    </form>
  );
};

export default ContactForm;`}
            </code>
          </pre>
          <p className="mt-4 text-lg">
            This example demonstrates how to use <code>useMailprexForm</code> to
            create a fully functional contact form in your React app. Includes
            all necessary fields and handles the form submission and Mailprex
            API responses.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Page;

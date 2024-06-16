"use client";
import { useMailprex } from "usemailprex-react";

const Form = () => {
  const webName = "Mailprex Landing";
  const emailDestiny = process.env.NEXT_PUBLIC_EMAIL_DESTINY || "";
  const url = process.env.NEXT_PUBLIC_API_URL_SEND || "";
  const formToken = process.env.NEXT_PUBLIC_MAILPREX_FORM_TOKEN || "";
  const { formData, handleChange, handleSubmit, response } = useMailprex({
    url,
    webName,
    emailDestiny,
    formToken,
  });
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    await handleSubmit(e);
    if (response.error) {
      Error("Error al enviar el mensaje. Inténtalo de nuevo más tarde.");
    } else {
      ("¡Mensaje enviado con éxito!");
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className=" mx-auto p-6 bg-transparent ">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative z-0">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="peer block w-full appearance-none border-0 border-b border-accent bg-transparent py-2.5 px-0 text-sm text-accent focus:border-secondary focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-accent duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent ">
            Your FullName
          </label>
        </div>
        <div className="relative z-0">
          <input
            type="text"
            value={formData.email}
            required
            onChange={handleChange}
            name="email"
            className="peer block w-full appearance-none border-0 border-b border-accent bg-transparent py-2.5 px-0 text-sm text-accent focus:border-secondary focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-accent duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent ">
            Your email
          </label>
        </div>
        <div className="relative z-0 col-span-2">
          <textarea
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className="peer block w-full appearance-none border-0 border-b  bg-transparent py-2.5 px-0 text-sm text-accent focus:border-secondary focus:outline-none focus:ring-0"
            placeholder=" "
          ></textarea>
          <label
            htmlFor="message"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-accent duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent "
          >
            Your message
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 rounded-md bg-black px-10 py-2 text-white"
      >
        Send Message
      </button>

      {response.loading && (
        <p className="mt-4 text-blue-100">Enviando correo electrónico...</p>
      )}
      {response.error && (
        <p className="mt-4 text-red-300">
          Error al enviar el correo electrónico: {response.error.message}
        </p>
      )}
      {response.data && (
        <p className="mt-4 text-green-500">{response.data.message}</p>
      )}
    </form>
  );
};

export default Form;

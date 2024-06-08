"use client";
import { useMailprex } from "usemailprex-react";

const Form = () => {
  const webName = "Mailprex Test Form";
  const emailDestiny = "agustin2051@gmail.com";
  const url = "http://localhost:5000/email/send";
  const formToken = "d1ec4948-bd7e-411e-a446-181ff5fa4533";
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
    <form
      onSubmit={handleFormSubmit}
      method="post"
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="fullname"
          className="block text-gray-700 font-semibold mb-2"
        >
          Nombre Completo *
        </label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Nombre completo"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Correo Electrónico *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Correo electrónico"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 font-semibold mb-2"
        >
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Teléfono"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="service"
          className="block text-gray-700 font-semibold mb-2"
        >
          Servicio
        </label>
        <input
          type="text"
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Servicio"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-700 font-semibold mb-2"
        >
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows={4}
          placeholder="Mensaje"
          required
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
        >
          Enviar Mensaje
        </button>
      </div>
      {response.loading && (
        <p className="mt-4 text-blue-500">Enviando correo electrónico...</p>
      )}
      {response.error && (
        <p className="mt-4 text-red-500">
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

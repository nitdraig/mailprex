import DocsLayout from "@/app/components/DocsComponents/DocsLayout";
import Head from "next/head";

const Page = () => {
  return (
    <DocsLayout>
      <Head>
        <title>Using the useMailprexForm Hook</title>
      </Head>
      <div className="lg:pl-0 pl-10">
        <h1 className="text-4xl font-bold">Using the useMailprexForm Hook</h1>
        <section>
          <h2 className="text-2xl font-semibold mt-6">Introduction</h2>
          <p className="mt-4 text-lg">
            The <code>useMailprexForm</code> hook makes it easy to integrate
            contact forms into your website using Mailprex. This hook manages
            the state of the form, handles changes to the fields, and sends the
            form information through the Mailprex API.
          </p>
          <p className="mt-4 text-lg">
            To use the <code>useMailprexForm</code> hook, you must first install
            it from npm:
          </p>
          <pre className="bg-white dark:bg-accent text-secondary  p-4 rounded-lg ">
            <code>npm install mailprex</code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-6">Using the Hook</h2>
          <h3 className="text-xl font-semibold mt-4">
            Import and Configuration
          </h3>
          <p className="mt-4 text-lg">
            First, import the hook into your component:
          </p>
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg ">
            <code>import useMailprexForm from `mailprex`</code>
          </pre>
          <p className="mt-4 text-lg">
            Then, configure the hook in your component:
          </p>
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg ">
            <code>
              {`const { formData, handleChange, handleSubmit, response } = useMailprexForm({
  url: "https://api.mailprex.com/sendEmail",
  webName: "YourWebName",
  emailDestiny: "destiny@example.com",
});`}
            </code>
          </pre>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-4">Form Implementation</h3>
          <p className="mt-4 text-lg">
            Implement the form in your component using the methods provided by
            the hook:
          </p>
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg ">
            <code>
              {`return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="fullname"
      value={formData.fullname}
      onChange={handleChange}
      placeholder="Nombre Completo"
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Correo Electrónico"
    />
    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      placeholder="Mensaje"
    ></textarea>
    <input
      type="text"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="Teléfono"
    />
    <input
      type="text"
      name="service"
      value={formData.service}
      onChange={handleChange}
      placeholder="Servicio"
    />
    <button type="submit">Enviar</button>
  </form>
);`}
            </code>
          </pre>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-4">Response Management</h3>
          <p className="mt-4 text-lg">
            The hook also provides the status of the API response, which you can
            use to display success or error messages:
          </p>
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg ">
            <code>
              {`if (response.loading) {
  return <p>Enviando...</p>;
}

if (response.error) {
  return <p>Error: {response.error.message}</p>;
}

if (response.data) {
  return <p>Correo enviado exitosamente!</p>;
}`}
            </code>
          </pre>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Page;

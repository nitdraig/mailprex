import CopyButton from "@/app/components/CopyButton";
import DocsLayout from "@/app/layouts/DocsLayout";

const Page: React.FC = () => {
  return (
    <DocsLayout>
      <title>Using the useMailprexForm Hook | Mailprex Docs</title>
      <div className="lg:pl-0 pl-10">
        <h2 className="text-4xl font-bold">Using the useMailprexForm Hook</h2>
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
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg overflow-x-auto">
            <CopyButton code={`npm install mailprex`} />
            <code>
              {`
            
npm install mailprex`}
            </code>
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
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg overflow-x-auto">
            <CopyButton code={`import useMailprexForm from 'mailprex';`} />
            <code>{`
            
import useMailprexForm from mailprex;`}</code>
          </pre>
          <p className="mt-4 text-lg">
            Then, configure the hook in your component:
          </p>
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg overflow-x-auto">
            <CopyButton
              code={`
const { formData, handleChange, handleSubmit, response } = useMailprexForm({
  url: "https://api.mailprex.com/sendEmail",
  webName: "YourWebName",
  emailDestiny: "destiny@example.com",
});`}
            />
            <code>
              {`
              
              
const { formData, handleChange, handleSubmit, response } = useMailprexForm({
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
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg overflow-x-auto">
            <CopyButton
              code={`
return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="fullname"
      value={formData.fullname}
      onChange={handleChange}
      placeholder="Nombre Completo"
    />
    {/* Rest of the form */}
    <button type="submit">Submit</button>
  </form>
);`}
            />
            <code>
              {`
              
return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="fullname"
      value={formData.fullname}
      onChange={handleChange}
      placeholder="Nombre Completo"
    />
    {/* Rest of the form */}
    <button type="submit">Submit</button>
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
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg overflow-x-auto mb-4">
            <CopyButton
              code={`


if (response.loading) {
  return <p>Enviando...</p>;
}

if (response.error) {
  return <p>Error: {response.error.message}</p>;
}

if (response.data) {
  return <p>Correo enviado exitosamente!</p>;
}`}
            />
            <code>
              {`
              
  if (response.loading) {
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

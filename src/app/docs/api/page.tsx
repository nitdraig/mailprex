import CopyButton from "@/app/components/CopyButton";
import DocsLayout from "@/app/layouts/DocsLayout";

const Page = () => {
  return (
    <DocsLayout>
      <title>API Reference | Mailprex Docs</title>

      <div className="lg:pl-4 pl-20 mt-24 mx-2 lg:mb-4 mb-8">
        <h1 className="lg:text-4xl text-3xl font-bold">API Reference</h1>
        <section>
          <h2 className="text-2xl font-semibold mt-6">Introduction</h2>
          <p className="mt-4 text-lg">
            The API Reference provides complete documentation on Mailprex API
            endpoints, including request and response parameters, and usage
            examples.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-6">Endpoint: /sendEmail</h2>
          <p className="mt-4 text-lg">
            <strong>Description:</strong> Sends an email using the specified
            parameters.
          </p>
          <h3 className="text-xl font-semibold mt-4">Request Parameters:</h3>
          <ul className="list-disc list-inside mt-2 text-lg">
            <li>
              <strong>to</strong>: (String) Email address of the recipient.
            </li>
            <li>
              <strong>subject</strong>: (String) Subject of the email.
            </li>
            <li>
              <strong>body</strong>: (String) Body of the email.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Request Example:</h3>
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg overflow-x-auto">
            <CopyButton
              code={`{
  "to": "destinatario@example.com",
  "subject": "¡Hi, from Mailprex!",
  "body": "This is a test email sent from Mailprex."
}`}
            />
            <code>
              {`{
  "to": "destinatario@example.com",
  "subject": "¡Hi, from Mailprex!",
  "body": "This is a test email sent from Mailprex."
}`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold mt-4">Successful Response:</h3>
          <pre className="bg-white dark:bg-accent text-secondary p-4 rounded-lg overflow-x-auto">
            <CopyButton
              code={`{
  "success": true,
  "body": "Email sent successfully."
}`}
            />
            <code>
              {`{
  "success": true,
  "message": "Email sent successfully."
}`}
            </code>
          </pre>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Page;

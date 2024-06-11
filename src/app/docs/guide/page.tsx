import DocsLayout from "@/app/layouts/DocsLayout";

const Page = () => {
  return (
    <DocsLayout>
      <title>User Fields Guide | Mailprex Docs</title>
      <section className="max-w-3xl lg:mx-auto lg:pl-0 pl-14 p-4">
        <h2 className="text-4xl font-bold mb-4">
          User Fields Guide in Mailprex
        </h2>
        <p className="mt-2 text-lg">
          The{" "}
          <code className="inline-block bg-gray-200 text-secondary px-2 py-1 rounded-md">
            sendEmail
          </code>{" "}
          endpoint is an API function that allows you to send emails using the
          nodemailer service in Express. To use this endpoint correctly, certain
          information must be provided in the application. Below is a detailed
          explanation of these data:
        </p>
        <ul className="list-disc mt-4">
          <li className="mb-8">
            <strong className="block mb-2">emailDestiny:</strong>
            <div className="ml-4 text-gray-600 dark:text-accent">
              <p>Type: String</p>
              <p>Description: The email address of the message recipient</p>
              <p>Required: Yes</p>
            </div>
          </li>
          <li className="mb-8">
            <strong className="block mb-2">fullname:</strong>
            <div className="ml-4 text-gray-600 dark:text-accent">
              <p>Type: String</p>
              <p>Description: The full name of the message sender</p>
              <p>Required: Yes</p>
            </div>
          </li>
          <li className="mb-8">
            <strong className="block mb-2">email:</strong>
            <div className="ml-4 text-gray-600 dark:text-accent">
              <p>Type: String</p>
              <p>Description: The email address of the message sender</p>
              <p>Required: Yes</p>
            </div>
          </li>
          <li className="mb-8">
            <strong className="block mb-2">message:</strong>
            <div className="ml-4 text-gray-600 dark:text-accent">
              <p>Type: String</p>
              <p>
                Description: The content of the message to be sent via email
              </p>
              <p>Required: Yes</p>
            </div>
          </li>
          <li className="mb-8">
            <strong className="block mb-2">phone:</strong>
            <div className="ml-4 text-gray-600 dark:text-accent">
              <p>Type: String</p>
              <p>
                Description: The phone number of the message sender (optional)
              </p>
              <p>Required: No</p>
            </div>
          </li>
          <li className="mb-8">
            <strong className="block mb-2">service:</strong>
            <div className="ml-4 text-gray-600 dark:text-accent">
              <p>Type: String</p>
              <p>Description: The service related to the message (optional)</p>
              <p>Required: No</p>
            </div>
          </li>
          <li className="mb-8">
            <strong className="block mb-2">webName:</strong>
            <div className="ml-4 text-gray-600 dark:text-accent">
              <p>Type: String</p>
              <p>
                Description: The name of the website from which the message is
                sent
              </p>
              <p>Required: Yes</p>
            </div>
          </li>
          <li className="mb-8">
            <strong className="block mb-2">formToken:</strong>
            <div className="ml-4 text-gray-600 dark:text-accent">
              <p>Type: String</p>
              <p>
                Description: A unique token associated with a specific form
                created by the user in Mailprex
              </p>
              <p>Required: Yes</p>
            </div>
          </li>
        </ul>
      </section>
    </DocsLayout>
  );
};

export default Page;

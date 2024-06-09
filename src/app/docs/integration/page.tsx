import DocsLayout from "@/app/components/DocsComponents/DocsLayout";

const Page = () => {
  return (
    <DocsLayout>
      <title>Integration Guide | Mailprex Docs</title>

      <div className="lg:pl-0 pl-10">
        <h1 className="text-4xl font-bold">Integration Guide</h1>
        <section>
          <h2 className="text-2xl font-semibold mt-6">Introduction</h2>
          <p className="mt-4 text-lg">
            The Integration Guide provides you with detailed instructions for
            integrating Mailprex into the front end of your website. Here you’ll
            find code examples and best practices to ensure a smooth
            integration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-6">Steps for Integration</h2>
          <ol className="list-decimal list-inside mt-4 text-lg">
            <li className="mt-2">
              <strong>Step 1: Registration in Mailprex</strong>
              <br />
              Before starting, you need to sign up for Mailprex and get your API
              credentials. You can register on our{" "}
              <a href="/login" className=" pointer text-blue-600">
                home page.
              </a>
            </li>
            <li className="mt-2">
              <strong>Step 2: Installation and Configuration</strong>
              <br />
              Follow the instructions in our{" "}
              <a href="/docs/mailprexhook" className=" pointer text-blue-600">
                guide to install, configure and use MailprexHook{" "}
              </a>{" "}
              on your website. This includes including the script in your jsx or
              tsx react component and setting the necessary parameters.
            </li>
            <li className="mt-2">
              <strong>Step 3: Form Integration</strong>
              <br />
              Once set up, you can easily integrate contact forms into your
              website using our API. Check out our documentation to learn about
              the different integration methods available.
            </li>
          </ol>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Page;

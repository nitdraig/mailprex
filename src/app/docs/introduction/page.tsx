import DocsLayout from "@/app/layouts/DocsLayout";

const Page = () => {
  return (
    <DocsLayout>
      <title>Welcome to Mailprex Documentation | Mailprex Docs</title>
      <div className="lg:pl-4 pl-20 mt-24 mx-4">
        <h1 className="lg:text-4xl text-3xl font-bold">
          Welcome to the Mailprex Documentation!
        </h1>
        <section>
          <p className="mt-4 lg:text-lg text-md">
            Here you will find all the information you need to integrate and use
            our email sending platform on your website. If you have any
            questions that are not covered here, please feel free to contact our
            technical support team.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-6">Sections:</h2>
          <ul className="list-disc list-inside mt-2  lg:text-lg text-md">
            <a href="/docs/introduction">
              <li>Introduction</li>
            </a>
            <a href="/docs/api">
              <li>API Reference</li>
            </a>
            <a href="/docs/integration">
              <li>Integration Guide</li>
            </a>
            <a href="/docs/mailprexhook">
              <li>Using the Hook useMailprexForm</li>
            </a>
            <a href="/docs/faq">
              <li>Frequently Asked Questions</li>
            </a>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
};

export default Page;

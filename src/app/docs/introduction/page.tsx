import DocsLayout from "@/app/components/DocsComponents/DocsLayout";
import Head from "next/head";

const Page = () => {
  return (
    <DocsLayout>
      <title>Welcome to Mailprex Documentation | Mailprex Docs</title>
      <div className="lg:pl-0 pl-10">
        <h1 className="text-4xl font-bold">
          Welcome to the Mailprex Documentation!
        </h1>
        <section>
          <p className="mt-4 text-lg">
            Here you will find all the information you need to integrate and use
            our email sending platform on your website. If you have any
            questions that are not covered here, please feel free to contact our
            technical support team.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-6">Sections:</h2>
          <ul className="list-disc list-inside mt-2 text-lg">
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

import DocsLayout from "@/app/components/DocsComponents/DocsLayout";
import Head from "next/head";

const page = () => {
  return (
    <DocsLayout>
      <div className="lg:pl-0 pl-10">
        <h1 className="text-4xl font-bold">Integration Guide</h1>
        <p className="mt-4 text-lg">
          The Integration Guide provides you with detailed instructions for
          integrating Mailprex into the front end of your website. Here youll
          find code examples and best practices to ensure a smooth integration.
        </p>
        <ul>
          <li>
            Step 1: Registration in Mailprex Before starting, you need to sign
            up for Mailprex and get your API credentials. You can register on
            our home page.
          </li>
          <li>
            Step 2: Installation and Configuration Follow the instructions in
            our guide to install and configure Mailprex on your website. This
            includes including the script in your HTML and setting the necessary
            parameters.
          </li>
          <li>
            Step 3: Form Integration Once set up, you can easily integrate
            contact forms into your website using our API. Check out our
            documentation to learn about the different integration methods
            available.
          </li>
        </ul>
      </div>
    </DocsLayout>
  );
};

export default page;

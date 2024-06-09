import DocsLayout from "@/app/components/DocsComponents/DocsLayout";

const page = () => {
  return (
    <DocsLayout>
      <div className="lg:pl-0 pl-10">
        <h3 className="text-4xl font-bold">
          Welcome to the Mailprex documentation!
        </h3>
        <p className="mt-4 text-lg">
          Here you will find all the information you need to integrate and use
          our email sending platform on your website. If you have any questions
          that are not covered here, please feel free to contact our technical
          support team.
        </p>
        <p>Sections:</p>
        <ul>
          <li>Introduction</li>
          <li>API Reference</li>
          <li>Integration Guide</li>
          <li>Using the Hook useMailprexForm</li>
          <li>Frequently Asked Questions</li>
        </ul>
      </div>
    </DocsLayout>
  );
};

export default page;

import DocsLayout from "../layouts/DocsLayout";

const page = () => {
  return (
    <DocsLayout>
      <title>Mailprex Documentation | Mailprex Docs</title>
      <div className="lg:pl-0 pl-10">
        <h3 className="text-4xl font-bold">Introduction</h3>
        <p className="mt-4 text-lg">
          Mailprex is an email sending platform designed to simplify the process
          of email communication from your website. Our mission is to provide an
          easy-to-use and highly efficient solution for both website owners and
          developers. With Mailprex, You can easily integrate contact forms into
          the front end of your website and allow your visitors to send emails
          directly from there.
        </p>
      </div>
    </DocsLayout>
  );
};

export default page;

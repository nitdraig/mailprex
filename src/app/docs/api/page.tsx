import DocsLayout from "@/app/components/DocsComponents/DocsLayout";
import Head from "next/head";

const page = () => {
  return (
    <DocsLayout>
      <div className="lg:pl-0 pl-10">
        <h1 className="text-4xl font-bold">API</h1>
        <p className="mt-4 text-lg">
          Aquí aprenderás cómo instalar nuestro producto.
        </p>
      </div>
    </DocsLayout>
  );
};

export default page;

import DocsLayout from "@/app/components/DocsComponents/DocsLayout";

const page = () => {
  return (
    <DocsLayout>
      <div className="lg:pl-0 pl-10">
        <h1 className="text-4xl font-bold">Introducción</h1>
        <p className="mt-4 text-lg">
          Bienvenido a la introducción de nuestra documentación.
        </p>
      </div>
    </DocsLayout>
  );
};

export default page;

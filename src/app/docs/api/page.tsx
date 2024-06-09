import DocsLayout from "@/app/components/DocsComponents/DocsLayout";
import Head from "next/head";

const page = () => {
  return (
    <DocsLayout>
      <div className="lg:pl-0 pl-10">
        <h1 className="text-4xl font-bold"> API Reference </h1>
        <p className="mt-4 text-lg">
          The API Reference provides complete documentation on Mailprex API
          endpoints, including request and response parameters, and usage
          examples.
        </p>
        <p>
          Endpoint: /sendEmail Description: Sends an email using the specified
          parameters.
        </p>
        <ul>
          <li>
            Request Parameters: to: (String) Email address of the recipient.
          </li>
          <li> subject: (String) Subject of the email.</li>
          <li>body: (String) Body of the email.</li>
        </ul>
        <p>Request Example:</p>´
        {/* <p>
          {
  "to": "destinatario@example.com",
  "subject": "¡Hola desde Mailprex!",
  "body": "Este es un correo electrónico de prueba enviado desde Mailprex."
}
        </p>
        <p>Successful Response:</p>
        <p>{
  "success": true,
  "message": "Correo electrónico enviado exitosamente."
}
</p> */}
      </div>
    </DocsLayout>
  );
};

export default page;

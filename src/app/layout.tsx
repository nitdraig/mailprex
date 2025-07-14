import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./api/AuthContext";

import ToastProvider from "./ToastProvider";

const quik = Quicksand({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Mailprex | Send Emails from your Website with Ease",
  description:
    "Mailprex is the ideal platform for sending emails from your website. Our user-friendly API integrates into your front end, enabling quick and secure form submissions. We offer advanced customization and robust security to protect your data. Simplify your email sending process with Mailprex, your reliable and efficient solution.",
  keywords: [
    "email sending platform",
    "email sending from websites",
    "email sending API",
    "front end email integration",
    "web form email sending",
    "email service for websites",
    "email marketing API",
    "email customization",
    "email sending security",
    "web form data privacy",
    "secure email sending",
    "email solutions for developers",
    "email platform for web developers",
    "email automation",
    "email management for websites",
    "email hooks for React",
    "form sending hook in React",
    "email service for web developers",
    "custom email sending",
    "email sending tool for websites",
    "plataforma de envío de correos electrónicos",
    "envío de correos electrónicos desde sitios web",
    "API de envío de correos electrónicos",
    "integración de correo electrónico en front end",
    "envío de formularios web",
    "servicio de correo electrónico para sitios web",
    "API de email marketing",
    "personalización de correos electrónicos",
    "seguridad en envío de correos electrónicos",
    "privacidad en formularios web",
    "envío seguro de correos electrónicos",
    "soluciones de email para desarrolladores",
    "plataforma de correo para desarrolladores web",
    "automatización de correos electrónicos",
    "gestión de correos electrónicos para sitios web",
    "email hooks para React",
    "hook de envío de formularios en React",
    "servicio de correo para desarrolladores web",
    "envío de correos electrónicos personalizado",
    "herramienta de envío de correos para sitios web",
  ],
  authors: {
    name: "Agustín Avellaneda",
  },
  publisher: "Agustín Avellaneda",

  twitter: {
    card: "summary_large_image",
    title: "Mailprex  | Send Emails from your Website with Ease ",
    description:
      "Mailprex is the ideal platform for sending emails from your website. Our user-friendly API integrates into your front end, enabling quick and secure form submissions. We offer advanced customization and robust security to protect your data. Simplify your email sending process with Mailprex, your reliable and efficient solution.",
    creator: "Avellaneda Agustín",
    images:
      "https://res.cloudinary.com/draig/image/upload/v1718564493/mailprex/ecqm348liaxh626yzscs.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

  openGraph: {
    type: "website",
    url: "https://mailprex.excelso.xyz",
    title: "Mailprex  | Send Emails from your Website with Ease ",
    description:
      "Mailprex is the ideal platform for sending emails from your website. Our user-friendly API integrates into your front end, enabling quick and secure form submissions. We offer advanced customization and robust security to protect your data. Simplify your email sending process with Mailprex, your reliable and efficient solution.",
    siteName: "Mailprex  | Send Emails from your Website with Ease",
    images: [
      {
        url: "https://res.cloudinary.com/draig/image/upload/v1718564493/mailprex/ecqm348liaxh626yzscs.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quik.className}>
        <link rel="canonical" href="https://www.mailprex.excelso.xyz" />
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            {children}
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

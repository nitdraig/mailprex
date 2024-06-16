import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  Inter,
  Playfair_Display,
  Quicksand,
} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./api/AuthContext";
import { ToastContainer } from "react-toastify";
import ToastProvider from "./ToastProvider";

const inter = Inter({ subsets: ["latin"] });
const pair = Playfair_Display({ subsets: ["latin"] });
const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const quik = Quicksand({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Mailprex | Send Emails from your Website with Ease",
  description:
    "Mailprex is an email sending platform designed to allow website owners to quickly and easily send emails through forms on the front end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quik.className}>
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

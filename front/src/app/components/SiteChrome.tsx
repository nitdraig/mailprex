"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MINIMAL_CHROME_ROUTES = ["/login", "/register", "/verify", "/dashboard"];

const SiteChrome = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isMinimalChrome = MINIMAL_CHROME_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isMinimalChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default SiteChrome;

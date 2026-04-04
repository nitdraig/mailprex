import type { ReactNode } from "react";
import { Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import Script from "next/script";
import "nextra-theme-docs/style.css";
import "../src/styles/globals.css";

const twitterIcon = (
  <svg width="24" height="24" viewBox="0 0 248 204" aria-hidden>
    <path
      fill="currentColor"
      d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
    />
  </svg>
);

export const metadata = {
  metadataBase: new URL("https://mailprex.excelso.xyz"),
  title: {
    default: "Docs | Mailprex",
    template: "%s | Mailprex Docs",
  },
  description:
    "Mailprex is a service designed to facilitate sending emails from web forms.",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/draig/image/upload/v1718559486/mailprex/au9xhubjbmywl0lx9t4v.ico",
        type: "image/x-icon",
      },
      {
        url: "https://res.cloudinary.com/draig/image/upload/v1718559439/mailprex/vfec5ckpdm6ydwuamnne.png",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    siteName: "Mailprex",
    description:
      "Mailprex is a service designed to facilitate sending emails from web forms.",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://mailprex.excelso.xyz",
  },
};

const gaId = process.env.NEXT_PUBLIC_GOOGLEANALYTIC;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();
  const navbar = (
    <Navbar
      logo={
        <>
          <img
            className="rounded-full h-20 w-20"
            style={{ width: "3.2rem" }}
            src="https://mailprex.excelso.xyz/logo.webp"
            alt="Mailprex Logo"
          />
          <span style={{ marginLeft: ".4em", fontWeight: 800 }}>MailprexDocs</span>
        </>
      }
      projectLink="https://github.com/nitdraig/usemailprex-hook"
      chatLink="https://twitter.com/nitdraig"
      chatIcon={twitterIcon}
    />
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <Head
        backgroundColor={{ dark: "rgb(15, 16, 17)", light: "#fff" }}
        color={{
          hue: { dark: 204, light: 212 },
          saturation: { dark: 100, light: 100 },
        }}
      >
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />
      </Head>
      <body>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="mailprex-ga" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(gaId)});
              `}
            </Script>
          </>
        ) : null}
        <Layout
          banner={
            <Banner storageKey="1.0-release">
              <a
                href="https://en.blog.agustin.top"
                target="_blank"
                rel="noreferrer"
              >
                🎉 Mailprex 1.0 is soon to released. Read more →
              </a>
            </Banner>
          }
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/nitdraig/mailprex/tree/main/docs"
          editLink="Edit this page on GitHub"
          footer={
            <span>
              Mailprex Docs {new Date().getFullYear()} ©{" "}
              <a href="https://mailprex.excelso.xyz" target="_blank" rel="noreferrer">
                Mailprex
              </a>
              .
            </span>
          }
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}

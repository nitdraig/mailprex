import Script from "next/script";
import IndexView from "./views/IndexView/IndexView";

const gaId = process.env.NEXT_PUBLIC_GOOGLEANALYTIC;

export default function Home() {
  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      <IndexView />
    </>
  );
}

"use client";

import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim();

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const content = (
    <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
  );

  if (!googleClientId) {
    return content;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>{content}</GoogleOAuthProvider>
  );
}

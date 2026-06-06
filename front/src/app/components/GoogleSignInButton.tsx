"use client";

import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

type GoogleSignInButtonProps = {
  onSuccess: (credential: string) => void | Promise<void>;
  onError?: (message: string) => void;
  disabled?: boolean;
};

const GoogleSignInButton = ({
  onSuccess,
  onError,
  disabled = false,
}: GoogleSignInButtonProps) => {
  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      onError?.("Google did not return a valid credential");
      return;
    }

    try {
      await onSuccess(response.credential);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Google sign-in failed";
      onError?.(message);
    }
  };

  return (
    <div
      className={`flex w-full justify-center ${disabled ? "pointer-events-none opacity-60" : ""}`}
      aria-disabled={disabled}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => onError?.("Google sign-in was cancelled or failed")}
        theme="outline"
        size="large"
        shape="rectangular"
        text="continue_with"
        width="100%"
      />
    </div>
  );
};

export default GoogleSignInButton;

"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyView = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const REALAPI = "http://localhost:5000";
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch(`${REALAPI}/auth/verify?token=${token}`);
          const data = await response.json();

          if (response.ok) {
            setMessage(data.message);
            setError("");
          } else {
            setMessage("");
            setError(data.message);
          }
        } catch (error) {
          setMessage("");
          setError("Error al verificar la cuenta");
        }
      };

      verifyToken();
    }
  }, [token]);
  return (
    <div className="h-screen bg-accent flex justify-center items-center">
      <div className="bg-primary p-8 rounded-lg shadow-lg">
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};
export default VerifyView;

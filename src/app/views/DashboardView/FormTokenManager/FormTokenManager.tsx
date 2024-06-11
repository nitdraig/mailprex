"use client";
import React, { useState, useEffect } from "react";
import {
  deleteFormToken,
  generateFormToken,
  getFormToken,
} from "@/app/api/api";
import { useAuth } from "@/app/api/AuthContext";
import Link from "next/link";
import TokenActions from "@/app/components/DashboardComponents/TokenActions";

const FormTokenManager: React.FC = () => {
  const [formToken, setFormToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token, email, userData } = useAuth();
  const JWT = token!;
  const EMAIL = email!;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await getFormToken(JWT);
        setFormToken(token);
        setError(null);
      } catch (error) {
        console.error("Error al obtener el token del formulario:", error);
        setError("Error al obtener el token del formulario");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateToken = async () => {
    setLoading(true);
    try {
      const token = await generateFormToken(JWT, EMAIL);
      setFormToken(token);
      setError(null);
    } catch (error) {
      console.error("Error al generar el token del formulario:", error);
      setError("Error al generar el token del formulario");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteToken = async () => {
    setLoading(true);
    try {
      await deleteFormToken(JWT, EMAIL);
      setFormToken(null);
      setError(null);
    } catch (error) {
      console.error("Error al eliminar el token del formulario:", error);
      setError("Error al eliminar el token del formulario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex -mt-4 justify-center w-full h-full">
      <div className="p-4 rounded shadow-md w-full max-w-md">
        <h3 className="lg:text-5xl text-4xl font-thin mb-4 dark:text-white text-center">
          Welcome {userData?.name}!
        </h3>
        <p className="dark:text-gray-200 text-lg font-serif text-secondary text-center mb-4">
          Remember see the{""}
          <Link
            className="text-blue-500 pointer"
            prefetch
            href="/docs/introduction"
          >
            {""}Mailprex Docs
          </Link>
          , and not share your form token, is private.
        </p>
        <h4 className="lg:text-3xl text-2xl dark:text-accent text-center font-bold mb-4">
          Form Token Management
        </h4>
        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <TokenActions
          formToken={formToken}
          generateFormToken={generateToken}
          deleteFormToken={handleDeleteToken}
        />
      </div>
    </div>
  );
};

export default FormTokenManager;

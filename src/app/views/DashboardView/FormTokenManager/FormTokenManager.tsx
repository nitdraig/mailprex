"use client";
import React, { useState, useEffect } from "react";
import TokenActions from "../Components/TokenActions";
import {
  deleteFormToken,
  generateFormToken,
  getFormToken,
} from "@/app/api/api";
import { useAuth } from "@/app/api/AuthContext";

const FormTokenManager: React.FC = () => {
  const [formToken, setFormToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token, email } = useAuth();
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteToken = async () => {
    try {
      await deleteFormToken(JWT, EMAIL);
      setFormToken(null);
      setError(null);
    } catch (error) {}
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">Gestión de Form Token</h3>
      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <TokenActions
        formToken={formToken}
        generateFormToken={generateToken}
        deleteFormToken={handleDeleteToken}
      />
    </div>
  );
};

export default FormTokenManager;

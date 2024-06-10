"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    lastName: string
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const REALAPI = "http://localhost:5000";

  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${REALAPI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      const { token, message } = data;

      setToken(token);
      localStorage.setItem("token", token);
      setEmail(email);
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Failed to login");
    }
  };
  const register = async (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      // Realiza la solicitud POST al endpoint de registro
      const response = await fetch(`${REALAPI}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, email, password }),
      });

      // Convierte la respuesta en un objeto JSON
      const data = await response.json();

      // Si la respuesta no es exitosa, lanza un error
      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      // Extrae el mensaje de la respuesta
      const { message } = data;

      // Opcional: puedes manejar el mensaje de éxito aquí, por ejemplo, mostrarlo al usuario
      console.log("Registration successful:", message);
    } catch (error) {
      // Maneja los errores que puedan surgir durante la solicitud
      console.error("Error during registration:", error);
      throw new Error("Failed to register");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, email, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

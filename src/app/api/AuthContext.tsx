"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserData } from "../types/Types";
import {
  getFormToken as apiGetFormToken,
  generateFormToken as apiGenerateFormToken,
  deleteFormToken as apiDeleteFormToken,
} from "../api/api";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const REALAPI = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const [userData, setUserData] = useState<UserData | null>(null);
  const [formToken, setFormToken] = useState<string | null>(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
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

      if (typeof window !== "undefined") {
        setToken(token);
        localStorage.setItem("token", token);
      }
      setEmail(email);
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Failed to login");
    }
  };

  const getUserData = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${REALAPI}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const register = async (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(`${REALAPI}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }
      const { message } = data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw new Error("Failed to register");
    }
  };

  const updateUser = async (userData: UserData) => {
    if (!token) return;

    try {
      const response = await fetch(`${REALAPI}/auth/user/${userData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  };

  const deleteUser = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${REALAPI}/auth/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      logout();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  };
  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!token) return;

    try {
      const response = await fetch(`${REALAPI}/auth/changePassword`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error changing password:", error);
      throw new Error("Failed to change password");
    }
  };

  const getFormToken = async () => {
    if (!token) return;

    try {
      const formToken = await apiGetFormToken(token);
      setFormToken(formToken);
    } catch (error) {
      console.error("Error fetching form token:", error);
    }
  };
  const generateFormToken = async (email: string) => {
    if (!token) return;

    try {
      const formToken = await apiGenerateFormToken(token, email);
      setFormToken(formToken);
    } catch (error) {
      console.error("Error generating form token:", error);
    }
  };
  const deleteFormToken = async () => {
    if (!token) return;

    try {
      await apiDeleteFormToken(token, email!);
      setFormToken(null);
    } catch (error) {
      console.error("Error deleting form token:", error);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken(null);
    setEmail(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        changePassword,
        token,
        email,
        formToken,
        setFormToken,
        getFormToken,
        generateFormToken,
        deleteFormToken,
        updateUser,
        deleteUser,
        login,
        logout,
        register,
        getUserData,
        userData,
      }}
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

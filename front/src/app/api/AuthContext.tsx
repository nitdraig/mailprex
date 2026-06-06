"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, UserData } from "../types/Types";
import {
  deleteFormToken as apiDeleteFormToken,
  generateFormToken as apiGenerateFormToken,
  getFormToken as apiGetFormToken,
} from "../api/api";
import { authFetch } from "../api/fetchAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formToken, setFormToken] = useState<string | null>(null);

  const getUserData = useCallback(async () => {
    try {
      const response = await authFetch("/auth/me");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = (await response.json()) as UserData;
      setUserData(data);
      setEmail(data.email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
      setEmail(null);
      setIsAuthenticated(false);
    }
  }, []);

  const applyUser = useCallback((user: UserData) => {
    setUserData(user);
    setEmail(user.email);
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const bootstrapSession = async () => {
      try {
        const response = await authFetch("/auth/me");
        if (response.ok) {
          const data = (await response.json()) as UserData;
          setUserData(data);
          setEmail(data.email);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsAuthReady(true);
      }
    };

    bootstrapSession();
  }, []);

  const login = async (
    email: string,
    password: string,
    captchaToken?: string
  ) => {
    const response = await authFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, captchaToken }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to login");
    }

    setIsAuthenticated(true);
    setEmail(email);
    if (data.user) {
      applyUser(data.user as UserData);
    } else {
      await getUserData();
    }
  };

  const loginWithGoogle = async (credential: string) => {
    const response = await authFetch("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Google sign-in failed");
    }

    if (data.user) {
      applyUser(data.user as UserData);
      return;
    }

    await getUserData();
  };

  const register = async (
    name: string,
    lastName: string,
    email: string,
    password: string,
    captchaToken?: string
  ) => {
    const response = await authFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        lastName,
        email,
        password,
        captchaToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register");
    }
  };

  const updateUser = async (userData: UserData) => {
    const response = await authFetch(`/auth/user/${userData._id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = (await response.json()) as UserData;
    setUserData(data);
  };

  const deleteUser = async () => {
    const response = await authFetch("/auth/delete", { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    await logout();
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const response = await authFetch("/auth/changePassword", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      throw new Error("Failed to change password");
    }
  };

  const getFormToken = async () => {
    const status = await apiGetFormToken();
    setFormToken(status.hasToken ? status.prefix ?? "active" : null);
  };

  const generateFormToken = async (email: string) => {
    const result = await apiGenerateFormToken(email);
    setFormToken(result.formToken);
  };

  const deleteFormToken = async () => {
    if (!email) return;
    await apiDeleteFormToken(email);
    setFormToken(null);
  };

  const logout = async () => {
    try {
      await authFetch("/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Error during logout:", error);
    }

    setIsAuthenticated(false);
    setEmail(null);
    setUserData(null);
    setFormToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthReady,
        changePassword,
        token: null,
        email,
        formToken,
        setFormToken,
        getFormToken,
        generateFormToken,
        deleteFormToken,
        updateUser,
        deleteUser,
        login,
        loginWithGoogle,
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

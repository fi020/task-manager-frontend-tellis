import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

import axios from "axios";

interface AuthContextProps {
  user: string | null;
  token: string | null;
  register: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("auth_token");
  });

  const register = async (email: string, password: string): Promise<string> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log("API_URL:", API_URL);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { email, password });
      return res.data.message;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      throw new Error(message);
    }
  };

  const login = async (email: string, password: string): Promise<string> => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      console.log("Login response:", res.data);
      const token = res.data.token;
      const userEmail = res.data.email;
      const message = res.data.message;

      if (!token) {
        throw new Error("No token received from server.");
      }

      setToken(token);
      setUser(userEmail);
      localStorage.setItem("user_data", userEmail);
      localStorage.setItem("auth_token", token);

      return message || "Login successful";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Login failed. Please try again.";
        throw new Error(message);
      } else {
        throw new Error("An unexpected error occurred during login.");
      }
    }
  };



  const logout = () => {
    setUser(null);
    setToken(null);               // if you use token state too
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data"); // remove stored email as well
  };
  

  return (
    <AuthContext.Provider value={{ user, register, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

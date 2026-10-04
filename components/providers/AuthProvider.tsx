"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password?: string, role?: "USER" | "ADMIN") => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  switchUser: (role: "USER" | "ADMIN") => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local session or load default demo user if stored
    const stored = localStorage.getItem("brk_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      // Default to demo maker user
      const defaultUser: User = {
        id: "maker-user-id",
        name: "brkexperiments",
        email: "brkexperiments@gmail.com",
        role: "USER",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      };
      setUser(defaultUser);
      localStorage.setItem("brk_user", JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  const login = async (identifier: string, _password?: string, role?: "USER" | "ADMIN"): Promise<boolean> => {
    const cleanId = identifier.trim().toLowerCase();
    const isAdmin =
      role === "ADMIN" ||
      cleanId === "balaram" ||
      cleanId.includes("balaram") ||
      cleanId === "admin" ||
      cleanId.includes("admin");

    const newUser: User = {
      id: isAdmin ? "balaram-admin-id" : "maker-user-id",
      name: isAdmin ? "Balaram" : (cleanId.includes("@") ? cleanId.split("@")[0] : cleanId) || "brkexperiments",
      email: isAdmin
        ? "balaram@brkexperiments.dev"
        : cleanId.includes("@")
        ? cleanId
        : "brkexperiments@gmail.com",
      role: isAdmin ? "ADMIN" : "USER",
      avatar: isAdmin
        ? "/creator.jpg"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    };

    setUser(newUser);
    localStorage.setItem("brk_user", JSON.stringify(newUser));
    return true;
  };

  const register = async (name: string, email: string, _password?: string): Promise<boolean> => {
    const isAdm = name.toLowerCase().includes("balaram") || email.toLowerCase().includes("balaram");
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim() || "Maker",
      email: email.trim().toLowerCase(),
      role: isAdm ? "ADMIN" : "USER",
      avatar: isAdm ? "/creator.jpg" : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    };
    setUser(newUser);
    localStorage.setItem("brk_user", JSON.stringify(newUser));
    return true;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("brk_user");
  };

  const switchUser = async (role: "USER" | "ADMIN") => {
    if (role === "ADMIN") {
      await login("Balaram", "balaram@2008", "ADMIN");
    } else {
      await login("brkexperiments", "maker123", "USER");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

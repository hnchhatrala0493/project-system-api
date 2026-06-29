import React, { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

const readStoredUser = () => {
  const stored = localStorage.getItem("projectflow_user");

  if (!stored || stored === "undefined") {
    localStorage.removeItem("projectflow_user");
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    localStorage.removeItem("projectflow_user");
    localStorage.removeItem("projectflow_token");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("projectflow_token"));
  const [user, setUser] = useState(readStoredUser);

  const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("projectflow_token", data.token);
    localStorage.setItem("projectflow_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("projectflow_token", data.token);
    localStorage.setItem("projectflow_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("projectflow_token");
    localStorage.removeItem("projectflow_user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, login, register, logout, isAuthenticated: Boolean(token) }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/hooks/auth";

const AuthContext = createContext();

export function AuthProvider({ accessToken, refreshToken, children }) {
  const [user, setUser] = useState(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: () =>
      accessToken?.value
        ? getCurrentUser()
        : refreshToken?.value
          ? getCurrentUser()
          : "",
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

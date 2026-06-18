"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    user: User,
    token: string
  ) => void;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(
      null
    );

  const [token, setToken] =
    useState<string | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const savedToken =
      localStorage.getItem(
        "accessToken"
      );

    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (
      savedToken &&
      savedUser
    ) {
      setToken(savedToken);

      setUser(
        JSON.parse(
          savedUser
        )
      );
    }

    setLoading(false);
  }, []);

  const login = (
    userData: User,
    accessToken: string
  ) => {
    setUser(userData);

    setToken(accessToken);

    localStorage.setItem(
      "accessToken",
      accessToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );
  };

  const logout = () => {
    setUser(null);

    setToken(null);

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "user"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated:
          !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)

  return (
    <AuthContext.Provider value={{ loading, setLoading, user, setUser, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

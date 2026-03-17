import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        user,
        setUser,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
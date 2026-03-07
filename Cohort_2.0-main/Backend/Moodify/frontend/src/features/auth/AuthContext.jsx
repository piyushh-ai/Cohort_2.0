import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  return (
    <authContext.Provider value={{ user, setUser, loading, setLoading, error, setError }}>
      {" "}
      {children}
    </authContext.Provider>
  );
};

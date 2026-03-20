import { createContext, useState } from "react";

export const CollectionsContext = createContext();

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        setCollections,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
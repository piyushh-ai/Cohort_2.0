import { createContext, useState } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resurfaceItems, setResurfaceItems] = useState([]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        pagination,
        setPagination,
        loading,
        setLoading,
        error,
        setError,
        resurfaceItems,
        setResurfaceItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
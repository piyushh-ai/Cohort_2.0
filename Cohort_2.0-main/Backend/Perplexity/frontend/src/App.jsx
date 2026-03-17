import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app/AppRoutes";
import { useAuth } from "./features/auth/hooks/useAuth";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;

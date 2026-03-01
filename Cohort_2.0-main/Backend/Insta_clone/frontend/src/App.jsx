import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoutes";
import { useAuth } from "./feature/auth/hooks/useAuth";

const App = () => {
  const { fetchCurrentUser } = useAuth();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoutes";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { MovieContextProvider } from "./features/home/context/MoviesContext";

const App = () => {
  return (
    <AuthProvider>
      <MovieContextProvider>
        <RouterProvider router={router} />
      </MovieContextProvider>
    </AuthProvider>
  );
};

export default App;

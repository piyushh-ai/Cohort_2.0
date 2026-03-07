import React from "react";
import FaceExpression from "./features/expressions/components/FaceExpression";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.routes";
import { AuthProvider } from "./features/auth/AuthContext";
import { SongContextProvider } from "./features/home/songContext";

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  );
};

export default App;

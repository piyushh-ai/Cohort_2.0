import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app/AppRoutes";

const App = () => {
  

  return <RouterProvider router={router} />;
};

export default App;

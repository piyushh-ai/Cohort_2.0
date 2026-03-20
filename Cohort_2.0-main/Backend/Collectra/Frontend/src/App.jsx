import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoutes";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { ItemsProvider } from "./features/items/context/ItemsContext";
import { CollectionsProvider } from "./features/collections/context/CollectionsContext";

const App = () => {
  return (
    <AuthProvider>
      <CollectionsProvider>
        <ItemsProvider>
          <RouterProvider router={router} />
        </ItemsProvider>
      </CollectionsProvider>
    </AuthProvider>
  );
};

export default App;

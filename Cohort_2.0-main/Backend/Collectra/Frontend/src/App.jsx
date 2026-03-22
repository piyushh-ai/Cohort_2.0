import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoutes";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { ItemsProvider } from "./features/items/context/ItemsContext";
import { CollectionsProvider } from "./features/collections/context/CollectionsContext";
import ErrorBoundary from "./shared/components/Errorboundary"; // ✅ path apne hisaab se adjust karo

const App = () => {
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CollectionsProvider>
          <ItemsProvider>
            <RouterProvider router={router} />
          </ItemsProvider>
        </CollectionsProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;

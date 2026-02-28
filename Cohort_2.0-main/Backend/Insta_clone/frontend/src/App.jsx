import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./AppRoutes";
import { AuthProvider } from "./feature/auth/Auth.context";
import { PostContextProvider } from "./feature/posts/Post.context";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <PostContextProvider>
          <RouterProvider router={router} />
        </PostContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;

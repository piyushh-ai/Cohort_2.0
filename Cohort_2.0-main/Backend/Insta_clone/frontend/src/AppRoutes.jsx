import { React } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Feed from "./feature/posts/pages/feed";
import CreatePost from "./feature/posts/pages/CreatePost";
import ProtectedRoute from "./Protected_Public_Routes/ProtectedRoute";
import PublicRoute from "./Protected_Public_Routes/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
]);

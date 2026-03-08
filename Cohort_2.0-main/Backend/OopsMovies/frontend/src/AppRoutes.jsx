import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import Home from "./features/home/pages/Home";
import Welcome from "./features/auth/pages/Welcome";
import MovieDetails from "./features/home/pages/MovieDetails";
import Favorites from "./features/home/pages/Favorites";
import History from "./features/home/pages/History";
import About from "./features/auth/pages/About";
import Tmdb from "./features/auth/pages/Tmdb";
import Discover from "./features/home/pages/Discover";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/movie/:id",
    element: (
      <ProtectedRoute>
        <MovieDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/favorites",
    element: (
      <ProtectedRoute>
        <Favorites />
      </ProtectedRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    ),
  },
  {
    path: "/discover",
    element: (
      <ProtectedRoute>
        <Discover />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/tmdb",
    element: <Tmdb />,
  },
  // Unknown routes → welcome
  {
    path: "*",
    element: <Navigate to="/welcome" replace />,
  },
]);

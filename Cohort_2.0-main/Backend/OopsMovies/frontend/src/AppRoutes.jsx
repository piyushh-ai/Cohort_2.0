import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import Loader from "./shared/component/Loader";

// Lazy loaded pages
const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
const Home = lazy(() => import("./features/home/pages/Home"));
const Welcome = lazy(() => import("./features/auth/pages/Welcome"));
const MovieDetails = lazy(() => import("./features/home/pages/MovieDetails"));
const Favorites = lazy(() => import("./features/home/pages/Favorites"));
const History = lazy(() => import("./features/home/pages/History"));
const Discover = lazy(() => import("./features/home/pages/Discover"));
const About = lazy(() => import("./features/auth/pages/About"));
const Tmdb = lazy(() => import("./features/auth/pages/Tmdb"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  {
    path: "/welcome",
    element: (
      <Suspense fallback={<Loader />}>
        <Welcome />
      </Suspense>
    ),
  },

  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },

  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },

  {
    path: "/movie/:id",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <MovieDetails />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  {
    path: "/favorites",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <Favorites />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <History />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  {
    path: "/discover",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <Discover />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  {
    path: "/about",
    element: (
      <Suspense fallback={<Loader />}>
        <About />
      </Suspense>
    ),
  },

  {
    path: "/tmdb",
    element: (
      <Suspense fallback={<Loader />}>
        <Tmdb />
      </Suspense>
    ),
  },

  // Unknown routes → redirect to welcome
  {
    path: "*",
    element: <Navigate to="/welcome" replace />,
  },
]);

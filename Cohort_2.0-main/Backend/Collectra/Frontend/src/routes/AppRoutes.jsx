import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { PageLoader } from "../shared/components/Loader";
import ProtectedRoute from "../shared/components/protectRoute";
import AuthCallback from "./AuthCallback";

const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const ResetPassword = lazy(
  () => import("../features/auth/pages/ResetPassword"),
);
const ForgotPassword = lazy(
  () => import("../features/auth/pages/ForgotPassword"),
);
const Dashboard = lazy(() => import("../features/items/pages/Dashboard"));
const ItemDetail = lazy(() => import("../features/items/pages/ItemDetail"));
const Welcome = lazy(() => import("../features/welcome/pages/Welcome"));
const KnowledgeGraph = lazy(
  () => import("../features/items/components/KnowledgeGraph"),
);
const Profile = lazy(() => import("../features/auth/pages/Profile"));

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/welcome",
    element: withSuspense(Welcome),
  },
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/register",
    element: withSuspense(Register),
  },
  {
    path: "/reset-password/:id/:token",
    element: withSuspense(ResetPassword),
  },
  {
    path: "/forgot-password",
    element: withSuspense(ForgotPassword),
  },
  {
    path: "/item/:id",
    element: withSuspense(ItemDetail),
  },
  { path: "/auth/callback", element: <AuthCallback /> },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Profile />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/graph",
    element: withSuspense(KnowledgeGraph),
  },
]);

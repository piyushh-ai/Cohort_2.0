import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import useAuth from "../../features/auth/hooks/useAuth";
import { PageLoader } from "./Loader";

const Dashboard = lazy(() => import("../../features/items/pages/Dashboard"));

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  // children hain toh children return karo (Profile page etc.)
  if (children) return children;

  // Default: Dashboard
  return (
    <Suspense fallback={<PageLoader />}>
      <Dashboard />
    </Suspense>
  );
}

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import useAuth from "../../features/auth/hooks/useAuth";
import { circleLoading } from "../../shared/components/Loader";

const Dashboard = lazy(() => import("../../features/items/pages/Dashboard"));

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return circleLoading;

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  // children hain toh children return karo (Profile page etc.)
  if (children) return children;

  // Default: Dashboard
  return (
    <Suspense fallback={circleLoading}>
      <Dashboard />
    </Suspense>
  );
}

export default ProtectedRoute;

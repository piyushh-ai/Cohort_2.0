import { Navigate } from "react-router-dom";
import useAuth from "../../features/auth/hooks/useAuth";
import { PageLoader } from "./Loader";

// ✅ Fix: proper full-screen loading UI instead of plain <p>Loading...</p>
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLoader/>
    );
  }

  if (!user) {
    return <Navigate to="/welcome" />;
  }

  return children;
}

export default ProtectedRoute;
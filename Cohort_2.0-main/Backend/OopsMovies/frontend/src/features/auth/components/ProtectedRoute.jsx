import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../../../shared/component/Loader";

// ✅ Fix: proper full-screen loading UI instead of plain <p>Loading...</p>
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (!user) {
    return <Navigate to="/welcome" />;
  }

  return children;
}

export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { getTokenExpiration, logoutUser } from "../utils/auth";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const expiresAt = token ? getTokenExpiration(token) : 0;

  if (!token || !expiresAt) {
    logoutUser();
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;

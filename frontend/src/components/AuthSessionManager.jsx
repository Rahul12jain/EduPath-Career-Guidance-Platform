import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTokenExpiration, logoutUser } from "../utils/auth";

function AuthSessionManager() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const expiresAt = getTokenExpiration(token);
    const timeLeft = expiresAt - Date.now();

    const logoutTimer = setTimeout(() => {
      logoutUser();

      if (location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    }, Math.max(timeLeft, 0));

    return () => clearTimeout(logoutTimer);
  }, [location.pathname, navigate]);

  return null;
}

export default AuthSessionManager;

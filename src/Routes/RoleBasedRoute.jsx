import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";

import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserRole(response.data.role || "user");
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    const redirectPaths = {
      admin: "/dashboard/admin/profile",
      vendor: "/dashboard/vendor/profile",
      user: "/dashboard/user/profile",
    };
    return <Navigate to={redirectPaths[userRole] || "/dashboard/user/profile"} replace />;
  }

  return children;
};

export default RoleBasedRoute;

import { Outlet, Navigate } from "react-router";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoutes;

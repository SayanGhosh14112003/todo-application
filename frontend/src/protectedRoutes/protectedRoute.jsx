import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/context";
export default function ProtectNotLogin() {
  const [auth] = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

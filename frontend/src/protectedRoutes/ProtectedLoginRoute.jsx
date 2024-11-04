import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/context";
export default function ProtectLogin() {
  const [auth] = useAuth();
  return auth ? <Navigate to="/" /> : <Outlet />;
}

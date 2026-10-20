import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type NeedAuthProps = {
  children: ReactNode;
  role?: "admin";
};

function NeedAuth({ children, role }: NeedAuthProps) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
}

export default NeedAuth;

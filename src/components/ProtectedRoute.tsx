import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/404" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

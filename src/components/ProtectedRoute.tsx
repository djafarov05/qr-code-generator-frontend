import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { getProfile } from "../api/api";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { user, login, isLoggedIn } = useUserStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (user) {
      setChecked(true);
      return;
    }
    (async () => {
      try {
        const u = await getProfile();
        login(u);
      } finally {
        setChecked(true);
      }
    })();
  }, [user, login]);

  if (!checked) return null;
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;

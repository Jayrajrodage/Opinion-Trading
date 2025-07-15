import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "@heroui/react";

import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { isLoading, isError } = useAuth();
  const location = useLocation();

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (!isLoading && isError) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;

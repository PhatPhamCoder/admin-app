import { Navigate } from "react-router-dom";
export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorge = JSON.parse(localStorage.getItem("admin"));
  return getTokenFromLocalStorge?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};

import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorge = JSON.parse(localStorage.getItem("user"));
  return getTokenFromLocalStorge?.token === undefined ? (
    children
  ) : (
    <Navigate to="/admin" replace={true} />
  );
};

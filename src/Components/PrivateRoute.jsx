
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const accessConstent = "accessToken";
const sourceConstent = "loginSource"; // New constant for source

const PrivateRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const queryToken = params.get("accessToken");
  const querySource = params.get("source"); // Get the source from query params

  const storedToken = sessionStorage.getItem(accessConstent);
  const storedSource = sessionStorage.getItem(sourceConstent);

  useEffect(() => {
    if (queryToken) {
      sessionStorage.setItem(accessConstent, queryToken);
    }
    if (querySource) {
      sessionStorage.setItem(sourceConstent, querySource);
    }

    // Remove token & source from URL without reloading the page
    if (queryToken || querySource) {
      const newUrl = location.pathname;
      navigate(newUrl, { replace: true });
    }
  }, [queryToken, querySource, navigate, location.pathname]);

  const accessToken = storedToken || queryToken;

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

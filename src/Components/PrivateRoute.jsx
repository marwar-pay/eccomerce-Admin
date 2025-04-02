// import { Navigate, Outlet } from "react-router-dom";
// import { accessConstent } from "../helpingFile";

// const PrivateRoute = () => {
//   const accessToken = sessionStorage.getItem(accessConstent);

//   // Check if the user is authenticated
//   return accessToken ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;


// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const accessConstent = "accessToken"; // Ensure this matches your session storage key

// const PrivateRoute = () => {
//   const location = useLocation();
  
//   const params = new URLSearchParams(location.search);
//   const queryToken = params.get("accessToken");
//   const storedToken = sessionStorage.getItem(accessConstent);

//   useEffect(() => {
//     if (queryToken) {
//       sessionStorage.setItem(accessConstent, queryToken);
//     }
//   }, [queryToken]);

//   const accessToken = queryToken || storedToken;

//   return accessToken ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;



import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const accessConstent = "accessToken";

const PrivateRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const queryToken = params.get("accessToken");
  const storedToken = sessionStorage.getItem(accessConstent);

  useEffect(() => {
    if (queryToken) {
      sessionStorage.setItem(accessConstent, queryToken);
      
      // Remove token from URL without reloading the page
      const newUrl = location.pathname;
      navigate(newUrl, { replace: true });
    }
  }, [queryToken, navigate, location.pathname]);

  const accessToken = storedToken || queryToken;

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;


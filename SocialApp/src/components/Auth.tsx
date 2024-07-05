import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);

    if (token) {
      // Store token in local storage
      localStorage.setItem("token", token);

      // Navigate to the dashboard
      navigate("/dashboard");
    } else {
      console.log("Token not found in the URL");
      // navigate("/");
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default Auth;

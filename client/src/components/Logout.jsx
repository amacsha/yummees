import React from "react";
import Auth from "./Auth";
import apiServiceJWT from "./APISERVICEJWT";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  let navigate = useNavigate();

  const handleClick = async () => {
    await removeToken();
    setIsAuthenticated(false); 
    navigate("/login"); 
  };
  const removeToken = async () => {
    try {
      await apiServiceJWT.logout("accessToken");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleAuth = () => {
    try {
      Auth.logout(() => navigate("/login"));
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error in handleAuth:", error);
    }
  };

  return (
    <button class="logoutButton" onClick={() => handleClick()}>
      Logout
    </button>
  );
};

export default Logout;

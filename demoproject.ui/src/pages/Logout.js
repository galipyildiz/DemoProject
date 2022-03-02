import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../AppContext";


function Logout(){
    const ctx = useContext(AppContext);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    ctx.setToken(null);
    ctx.setIsLoggedIn(false);
    return (
        <Navigate to="/login" />
    );
}

export default Logout;
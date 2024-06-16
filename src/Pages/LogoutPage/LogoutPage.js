import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../utils/loginContext";

const LogoutPage = () => {
    const {isloggedin, setLoggedIn } = useContext(LoginContext);

    return(
        <>
        Logout page
        </>
    )
}

export default LogoutPage;
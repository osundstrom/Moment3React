import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";

const CheckCookie = ({children}: { children: ReactNode  }) => {
    const token = Cookies.get("token");

    if (!token) {
        return <Navigate to="/login" replace />;
         
    }

    return children;
};

export default CheckCookie;
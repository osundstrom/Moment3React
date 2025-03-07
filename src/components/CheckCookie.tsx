import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";
import { useEffect } from "react";


const CheckCookie = ({children}: { children: ReactNode  }) => {
    const navigate = useNavigate();

    
  useEffect(() => {
    
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login"); 
      }
    }, [navigate]); 
    
    return children;
  };

export default CheckCookie;
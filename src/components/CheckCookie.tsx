import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";
import { useEffect } from "react";

//kontrollera giltig coockie/jwt token
const CheckCookie = ({children}: { children: ReactNode  }) => {

    const navigate = useNavigate();//hooke för navigering

  
  useEffect(() => {
    
    const token = Cookies.get("token"); //hämtar token

    //om token ej finns
    if (!token) {
      navigate("/login");//till /login om token ej finns
      }
    }, []); 
    
    // rendera children(secret sidan/komponetne).
    return children;
  };

export default CheckCookie;
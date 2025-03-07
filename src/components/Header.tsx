import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../Header.css";
import { useEffect, useState } from 'react';



function Header() {
    const [tokenOk, setTokenOk] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = Cookies.get("token");

        if (token) {
            setTokenOk(true); 
            
        } else {
            setTokenOk(false); 
        }
    },[Cookies.get("token")]);

    const deleteCookie = () => {
        Cookies.remove("token");
        navigate("/login");
    };


    return (
        
            <div>
            <nav className="navFull">
                <div className='container'>
                    <Link to="/">
                        <img src="public/FaktaflowLogo.png" alt="Logo" width="35%" height="fit-content" />
                    </Link>
                </div>
                <div className="container">
                    {!tokenOk ? (
                <>
                <Link id="aButt" to="/">Hem</Link>
                <Link id="aButt" to="/Om">Om</Link>
                </> ) : (
                    <>
                    <Link id="aButt" to="/">Hem</Link>
                    <Link id="aButt" to="/Secret">Admin</Link>
                </>
                )}
                </div>

                <div className="divButt">
                {!tokenOk ? (
                <Link className="loginButt" to="/Login">&#128274;</Link>
                ) : (
                <div style={{cursor: "pointer"}}  className="loginButt" onClick={deleteCookie}>&#128275;</div>
                )}
                </div>
            </nav>
            </div>
            
    );
}

export default Header;
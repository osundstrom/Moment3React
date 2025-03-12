import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../Header.css";
import { useEffect, useState } from 'react';



function Header() {

    //state för toke/on inloggad
    const [tokenOk, setTokenOk] = useState<boolean>(false);
    const navigate = useNavigate();
    
    //körs vid start av komponent
    useEffect(() => {
        const token = Cookies.get("token"); //token/jwt

        // om token finns
        if (token) {
            setTokenOk(true); 
            
        } else { //om token ej finns
            setTokenOk(false); 
        }
    },[Cookies.get("token")]); //kör om token ändras(finns eller ej finns)
    
    //radera cookie/jwt token
    const deleteCookie = () => {
        Cookies.remove("token");
        setTokenOk(false);
        navigate("/login");
    };

//----------------------------------Return-----------------------------------------//

    return (
        
            <div>
            <nav className="navFull">
                <div className='container'>
                {/*Logo med länk till startsidan*/}
                    <Link to="/">
                        <img src="../public//bokkollen.png" alt="Logo" width="35%" height="fit-content" />
                    </Link>
                </div>
                <div className="container">
                    {/*2 olika, vid ej inloggad visas 2 länkar och vid inloggad 2 andra, alltså om token finns eller ej*/}
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
                    {/*2 olika, vid ej inloggad visas låst hänglås och ibloggad visat öppet hänglås*/}
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
import { Link } from 'react-router-dom';

import "../Header.css";


function Header() {


    return (
        <>
            
            <nav className="navFull">
                <div className='container'>
                    <Link to="/">
                        <img src="public/FaktaflowLogo.png" alt="Logo" width="30%" height="fit-content" />
                    </Link>
                </div>
                <div className="container">
                <Link id="aButt" to="/">Hem</Link>
                <Link id="aButt" to="/Om">Om</Link>
                <Link id="loginButt" to="/Login">&#128274;</Link>
                </div>
                
            </nav>
            
        </>
    );
}

export default Header;
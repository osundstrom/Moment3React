import { useState } from "react";
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom";
//import "../Login.css";

//Login
const Login = () => {

    //------------------------States------------------------------------------------//
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
   

    const navigate = useNavigate();

    //------------------------Post/login------------------------------------------------//
    const fetchLogin = async (e: React.FormEvent) => {
        e.preventDefault();// förhindra default
        setError(null); //nollställ

        try { //post föärfrågan
        const response = await fetch("https://moment3backend.onrender.com/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},

            body: JSON.stringify({ 
                username, password }),
        })

        const data = await response.json();

        //om response ej är ok
        if (!response.ok) {
            throw new Error(data.error || "ogiltiga uppgifter");
        }else {

            //spara token i cookie
            Cookies.set("token", data.recivedToken.token, {expires: 1});
            console.log(data.token)
            navigate("/Secret");
        
        }} catch(error: any) {
            setError(error.message);
        }
    }

    return (
        <div className="container">
            <h2>Logga in</h2>
            <form onSubmit={fetchLogin}> {/*fetchLogin vid submit*/}
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Användarnamn:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} //Uppdatera på ändring
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Lösenord:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} //Uppdatera på ändriogn
                    />
                </div>
                 {/*visa errro meddelande*/}
                {error && <p style={{ color: "red", fontSize: "1.2rem" }} className="error-text">{error}</p>}
                <br />
                <button className="btn btn-primary" type="submit">Logga in</button>
            </form>
        </div>
    );
    

}

export default Login;
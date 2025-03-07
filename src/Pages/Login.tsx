import { useState } from "react";
import Cookies from "js-cookie"; 
import { useNavigate } from "react-router-dom";
//import "../Login.css";


const Login = () => {
        //states
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const fetchLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},

            body: JSON.stringify({ 
                username, password }),
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }else {

            Cookies.set("token", data.recivedToken.token, {expires: 1});
            console.log(data.token)
            navigate("/Secret");
        
        }} catch(error: any) {
            setError(error)
        }
    }

    return (
        <div className="container">
            <h2>Logga in</h2>
            <form onSubmit={fetchLogin}>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Användarnamn:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Lösenord:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error-text">{error}</p>}
                <br />
                <button className="btn btn-primary" type="submit">Logga in</button>
            </form>
        </div>
    );
    

}

export default Login;
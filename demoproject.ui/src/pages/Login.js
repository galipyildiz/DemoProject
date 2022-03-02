import './Login.css'
import AppContext from '../AppContext.js';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiUrl from '../env/config.js'
import axios from 'axios'

function Login() {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [errors, setErrors] = useState([]);

    const handleSubmit = function (e) {
        setErrors([]);
        e.preventDefault();
        const loader = e.target.parentNode.children[0];
        loader.style.display = "inline-block";
        const form = e.target;
        form.style.display = "none";
        axios.post(apiUrl + "Auth/login", {
            username: username,
            password: password
        }).then(function (response) {
            const token = "bearer " + response.data;
            if (rememberMe) {
                localStorage["username"] = username;
                localStorage["token"] = token;
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("username");
            }
            else {
                sessionStorage["username"] = username;
                sessionStorage["token"] = token;
                localStorage.removeItem("username");
                localStorage.removeItem("token");
            }
            ctx.setToken(token);
            ctx.setUsername(username);
            ctx.setIsLoggedIn(true);
            navigate("/account");
        }).finally(function () {
            form.style.display = "block";
            loader.style.display = "none";
        }).catch(function (error) {
            if (!error.response) {
                setErrors(["Can not connect to the server."]);
                return;
            }
            else {
                setErrors([error.response.data["description"]]);
            }
        });
    }
    return (
        <div className='myElement'>
            <div className="lds-hourglass"></div>
            <form id="loginform" onSubmit={handleSubmit}>
                <h2 id="headerTitle">Login</h2>
                <div className={errors.length == 0 ? "d-none" : "errors"}>
                    {errors.join(" ")}
                </div>
                <div>
                    <div className="row">
                        <label>Username</label>
                        <input type="text" placeholder="username" value={username} onInput={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={password} onInput={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div id="button" className="row">
                        <button>Login</button>
                    </div>
                    <div className="row2">
                        <label className="checkbox">
                            <input type="checkbox" name="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            Remember me
                        </label>
                    </div>
                    <div id='alternativeLogin'>
                        <Link to="/register">Create Account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import apiUrl from '../env/config.js'
import axios from 'axios'
import './Login.css'

function Login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [rememberMe,setRememberMe] = useState(true);

    const handleSubmit = function (e){
        e.preventDefault();
        console.log(apiUrl); 
        console.log(username);
        console.log(password);
        console.log(rememberMe);
        axios.post(apiUrl + "Auth/login",{
            username: username,
            password: password
        }).then(function (response){
            console.log(response);
        }).catch(function (error){
            console.log(error);
        });
    }
    return (
        <>
            <form id="loginform" onSubmit={handleSubmit}>
                <h2 id="headerTitle">Login</h2>
                <div>
                    <div className="row">
                        <label>Username</label>
                        <input type="text" placeholder="username" value={username} onInput={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={password} onInput={(e) => setPassword(e.target.value)} required/>
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
        </>
    );
}

export default Login;
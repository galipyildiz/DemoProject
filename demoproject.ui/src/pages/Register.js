import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiUrl from '../env/config.js'
import Loader from '../components/Loader';
import './Register.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = function (e) {
        setErrors([]);
        e.preventDefault();
        if (password != confirmPassword) {
            console.log("test");
            setErrors(["Passwords do not match"]);
            return;
        }
        const loader = e.target.parentNode.children[0];
        loader.style.display = "inline-block";
        const form = e.target;
        form.style.display = "none";
        axios.post(apiUrl + "Auth/register", {
            username: username,
            email: email,
            password: password
        }).then(function (response) {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            toast.success("Successfully Registered. You will be redirect to login.", {
                autoClose : 2000,
                onClose: () => navigate("/account")
            });
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
            <Loader></Loader>
            <ToastContainer />
            <form id="registerForm" onSubmit={handleSubmit}>
                <h2 id="headerTitle">Register</h2>
                <div className={errors.length == 0 ? "d-none" : "errors"}>
                    {errors.join(" ")}
                </div>
                <div>
                    <div className="row">
                        <label>Username</label>
                        <input type="text" placeholder="username" onInput={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="row">
                        <label>Email</label>
                        <input type="email" placeholder="example@example.com" onInput={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" onInput={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="row">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Enter your password" onInput={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div id="button" className="row">
                        <button>Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
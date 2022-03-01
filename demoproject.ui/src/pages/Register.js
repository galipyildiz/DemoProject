import { Link } from 'react-router-dom';
import './Register.css'

function Register() {
    return (
        <>
            <form id="registerForm">
                <h2 id="headerTitle">Register</h2>
                <div>
                    <div className="row">
                        <label>Username</label>
                        <input type="text" placeholder="username" />
                    </div>
                    <div className="row">
                        <label>Email</label>
                        <input type="email" placeholder="example@example.com" />
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" />
                    </div>
                    <div className="row">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Enter your password" />
                    </div>
                    <div id="button" className="row">
                        <button>Register</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Register;
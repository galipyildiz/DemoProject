import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'
import AppContext from '../AppContext';
import './Header.css'

function Header() {
    const ctx = useContext(AppContext);
    const location = useLocation();
    const splitLocation = location.pathname.split("/");
    return (
        <nav className='navbar'>
            <Link className={splitLocation[1] === "" ? "active" : ""} to="/">Home</Link>
            <Link className={splitLocation[1] === "configuration" ? "active" : ""} to="/configuration">Configuration</Link>
            {
                ctx.isLoggedIn
                    ?
                    <>
                        <Link className={splitLocation[1] === "account" ? "left active" : "left"} to="/account">Account</Link>
                        <Link className={splitLocation[1] === "logout" ? "active" : ""} to="/logout">Logout</Link>
                    </>
                    :
                    <>
                        <Link className={splitLocation[1] === "login" ? "left active" : "left"} to="/login">Login</Link>
                        <Link className={splitLocation[1] === "register" ? "active" : ""} to="/register">Register</Link>
                    </>
            }
        </nav>
    );
}

export default Header;

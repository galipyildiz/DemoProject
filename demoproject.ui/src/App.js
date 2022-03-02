import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Configuration from './pages/Configuration.js'
import Home from './pages/Home.js'
import Error from './pages/Error.js'
import Logout from './pages/Logout.js'
import Account from './pages/Account.js'
import { useState } from 'react';
import AppContext from './AppContext';

function App() {

  const [token, setToken] = useState(sessionStorage["token"] || localStorage["token"] || null);
  const [username, setUsername] = useState(sessionStorage["username"] || localStorage["username"] || null);
  const [isLoggedIn, setIsLoggedIn] = useState(token != null);

  const handleClick = (e) => {
    for (const item of e.currentTarget.parentNode.children) {
      item.className = item.className.replace("active", "");
    }
    e.currentTarget.className += " active";
  }

  return (
    <AppContext.Provider value={{ token, setToken, username, setUsername, isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter basename='/DemoProject'>
        <nav className='navbar'>
          <Link onClick={handleClick} to="/">Home</Link>
          <Link onClick={handleClick} to="/configuration">Configuration</Link>
          {isLoggedIn
            ?
            <>
              <Link onClick={handleClick} className='left' to="/account">Account</Link>
              <Link onClick={handleClick} to="/logout">Logout</Link>
            </>
            :
            <>
              <Link onClick={handleClick} className="left" to="/login">Login</Link>
              <Link onClick={handleClick} to="/register">Register</Link>
            </>
          }


        </nav>
        <Routes basename="/DemoProject">
          <Route path="/" element={isLoggedIn ? <Home></Home> : <Login></Login>}>
          </Route>
          <Route path="/login" element={<Login></Login>}>
          </Route>
          <Route path="/register" element={<Register></Register>}>
          </Route>
          <Route path='/account' element={isLoggedIn ? <Account></Account> : <Login></Login>}>
          </Route>
          <Route path="/logout" element={isLoggedIn ? <Logout></Logout> : <Login></Login>}>
          </Route>
          <Route path="/configuration" element={isLoggedIn ? <Configuration></Configuration> : <Login></Login>}>
          </Route>
          <Route path="*" element={<Error></Error>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

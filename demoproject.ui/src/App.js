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


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClick = (e) => {
    for (const item of e.currentTarget.parentNode.children) {
      item.className = item.className.replace("active", "");
    }
    e.currentTarget.className += " active";
  }

  return (
    <>
      <BrowserRouter>
        <nav className='navbar'>
          <Link onClick={onClick} to="/">Home</Link>
          <Link onClick={onClick} to="/configuration">Configuration</Link>
          {isLoggedIn
            ?
            <>
              <Link onClick={onClick} className='left' to="/account">Account</Link>
              <Link onClick={onClick} to="/logout">Logout</Link>
            </>
            :
            <>
              <Link onClick={onClick} className='left' to="/login">Login</Link>
              <Link onClick={onClick} to="/register">Register</Link>
            </>
          }


        </nav>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home></Home> : <Login></Login>}>
          </Route>
          <Route path="/login" element={<Login></Login>}>
          </Route>
          <Route path="/register" element={<Register></Register>}>
          </Route>
          <Route path='/account' element={<Account></Account>}>
          </Route>
          <Route path="/logout" element={<Logout></Logout>}>
          </Route>
          <Route path="/configuration" element={isLoggedIn ? <Configuration></Configuration> : <Login></Login>}>
          </Route>
          <Route path="*" element={<Error></Error>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

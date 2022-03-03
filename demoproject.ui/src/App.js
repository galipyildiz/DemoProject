import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
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
import Header from './components/Header';

function App() {
  const [token, setToken] = useState(sessionStorage["token"] || localStorage["token"] || null);
  const [username, setUsername] = useState(sessionStorage["username"] || localStorage["username"] || null);
  const [isLoggedIn, setIsLoggedIn] = useState(token != null);

  return (
    <AppContext.Provider value={{ token, setToken, username, setUsername, isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter basename='/DemoProject'>
        <Header></Header>
        <Routes basename="/DemoProject">
          <Route path="/" element={isLoggedIn ? <Home></Home> : <Navigate to="/login" />}>
          </Route>
          <Route path="/login" element={<Login></Login>}>
          </Route>
          <Route path="/register" element={<Register></Register>}>
          </Route>
          <Route path='/account' element={isLoggedIn ? <Account></Account> : <Navigate to="/login" />}>
          </Route>
          <Route path="/logout" element={isLoggedIn ? <Logout></Logout> : <Navigate to="/login" />}>
          </Route>
          <Route path="/configuration" element={isLoggedIn ? <Configuration></Configuration> : <Navigate to="/login" />}>
          </Route>
          <Route path="*" element={<Error></Error>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

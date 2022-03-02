import './Account.css'
import { useContext } from "react";
import AppContext from "../AppContext";

function Account() {
    const ctx = useContext(AppContext);
    return (
        <div className="text-center">
            <h1>Welcome {ctx.username}!</h1>
        </div>
    );
}

export default Account;
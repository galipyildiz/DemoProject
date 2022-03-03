import './Account.css'
import { useContext } from "react";
import AppContext from "../AppContext";

function Account() {
    const ctx = useContext(AppContext);
    const image = 'https://robohash.org/' + ctx.username + '.bmp?size=256x256';
    return (
        <div className="text-center">
            <h1>Welcome {ctx.username}!</h1>
            <img src={image} alt={ctx.username} />
        </div>
    );
}

export default Account;
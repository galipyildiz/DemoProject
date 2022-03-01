import { Link } from 'react-router-dom';
import './Error.css'

function Error(){
    return (
        <div className='error'>
            <h1>Ooh Shit!</h1>
            <p>YOU'RE LOST!</p>
            <Link to="/">BACK TO HOME PAGE</Link>
        </div>
    );
}

export default Error;
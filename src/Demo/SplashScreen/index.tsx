import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/play-piano-logo.svg';
import "./index.css"

function SplashScreen() {
    return ( 
        <div className="splash-container">
            <Link to={"ModeSelect"}>
                <img
                src={logo}
                className="piano-logo"
                alt="logo"
            />
            </Link>
            <h2 className='splash-text'>Play any key to start!</h2>
        </div>
    );
}
export default SplashScreen;


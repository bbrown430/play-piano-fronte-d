import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/play-piano-logo.svg';
import "./index.css"

function SplashScreen() {
    return ( 
        <div className="splash-container">

            <Link to={"ModeSelect"}>
                <div className="piano-logo">

                <img
                style={{width: "1000px", height:"1000px"}}
                src={logo}
                className="logo"
                alt="logo"
             />
             </div>

            </Link>
            <h2 className='splash-text'>Play any key to start!</h2>
        </div>
    );
}
export default SplashScreen;


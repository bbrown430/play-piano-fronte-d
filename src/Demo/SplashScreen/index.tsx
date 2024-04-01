import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from '../../assets/play-piano-logo.svg';
import "./index.css"
import useKeyPressesFromServer, { useActionOnKeyPress } from "../utils/lastKeyPressAPIHook";
import { useEffect } from "react";
import { PPPATH } from "../../App";

function SplashScreen() {
    const nav = useNavigate();
    const action =  ()=>{
        nav(PPPATH.MODESELECT)};    

    useActionOnKeyPress(action);

        
    return ( 
        <div className="splash-container">

                <div className="piano-logo">

                <img
                style={{width: "1000px", height:"1000px"}}
                src={logo}
                className="logo"
                alt="logo"
             />
             </div>

            <h2 className='splash-text'>Play any key to start!</h2>
        </div>
    );
}
export default SplashScreen;


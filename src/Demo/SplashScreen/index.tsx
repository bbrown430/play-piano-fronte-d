import { useNavigate } from "react-router-dom"
import logo from '../../assets/play-piano-logo.svg';
import "./index.css"
import  { useActionOnKeyPress } from "../utils/APIHooks";
import { PPPATH } from "../../App";

function SplashScreen() {
    const nav = useNavigate();
    const action =  ()=>{
        nav(PPPATH.MODESELECT)};    

    useActionOnKeyPress(action);

        
    return ( 

        <div className="splash-container centered" onClick={action}>

              <div className="piano-logo">
                <img
                    src={logo}
                    className="piano-logo"
                    alt="logo"/>
             </div>
            <h1 className='splash-text'>Play any key to start!</h1>
        </div>
    );
}
export default SplashScreen;


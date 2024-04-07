import { usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import "../PlayPianoMenus/index.css"
import { PianoState } from '../utils/types';
import {  useControllerStatus } from "../utils/APIHooks";
import logo from '../../assets/play-piano-logo.svg';
import "../SplashScreen/index.css"
import { EndScreen } from "./EndScreen";
import { element } from "prop-types";
import { StartSongPage } from "./StartSongPage";
import { SheetMusic } from "./SheetMusic";
import { usePause } from "../utils/utils";

 export default function PlayPage() {
    const statusAPI : PianoState  = useControllerStatus();
    const controller = usePlayPianoController();
    usePause();
    
    
    return ( 
        <div className = "inProgress-container"
        >
             <ProgressHeader/>
            {
                (()=>{
                    switch(statusAPI){
                        case 'Menus':
                        case "Waiting":
                            return  <StartSongPage/>

                        case "inProgress":
                            if(controller.pianoMode==='Free'){
                                return <div className="center-logo">
                                    <img
                                        src={logo}
                                        className="piano-logo-pulse"
                                        alt="logo"/>
                                </div>
                            }
                            return <SheetMusic/>
                        case "Over":
                            return <EndScreen/>
                        default: 
                            return <></>
                    }
                })()
            }
            
        

        </div>
    );
}



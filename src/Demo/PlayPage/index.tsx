import { usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import "../PlayPianoMenus/index.css"
import { PianoState } from '../utils/types';
import {  useControllerStatus, useProgressFromServer, useStatusFromServer } from "../utils/APIHooks";
import logo from '../../assets/play-piano-logo.svg';
import "../SplashScreen/index.css"
import { EndScreen } from "./EndScreen";
import { StartSongPage } from "./StartSongPage";
import { SheetMusic } from "./SheetMusic";
import { usePause } from "../utils/utils";

 export default function PlayPage() {
    const statusAPI : PianoState  = useStatusFromServer();
    const controllerStatus = useControllerStatus();
    const controller = usePlayPianoController();
    const progress = useProgressFromServer();
    usePause();

    
    
    
    return ( 
        <div className = "inProgress-container">
             <ProgressHeader progress={progress}/>
            
    {statusAPI === 'Over' ? (
    <EndScreen />
) : controllerStatus === 'Waiting' ? (
    <StartSongPage />
) : controllerStatus === 'inProgress' && controller.pianoMode === 'Free' ? (
    <div className="center-logo">
        <img src={logo} className="piano-logo-pulse" alt="logo" />
    </div>
) : controllerStatus === 'inProgress' ? (
    <SheetMusic progress={progress}/>
) : <></>}
        </div>
    );
}



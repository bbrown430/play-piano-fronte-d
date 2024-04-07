import { useEffect, useState } from "react";
import {usePlayPianoController } from "../../App";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import "./playpageformatting.css"
import { useProgressFromServer, useScoreFromServer } from "../utils/APIHooks";
import { command } from "yargs";

export function ProgressHeader(){
    const controller = usePlayPianoController();
    const [songTitle,setSongTitle] = useState(controller.songTitle);
    const progress = useProgressFromServer();
    const score = useScoreFromServer()
    const [progressPercent,setProgressPercent] = useState("-1");


  
    useEffect(() => {

        const songTitleListener = () => {
            setSongTitle(controller.currentSong.title)
        }
        
        let percent = "-1"
        if(controller.currentSong.end && progress <= controller.currentSong.end){
          percent = (progress * 100 /controller.currentSong.end).toFixed();
        }
        setProgressPercent(percent)
       
        controller.currentSong.progress = progress;

        controller.addListener(PPEvents.SONG, songTitleListener);
        
        return () => {
            controller.removeListener(PPEvents.SONG, songTitleListener);

        };
      }, [progress,score,controller, controller.pianoSound, controller.status, controller.songTitle]);
    


    return (
        <div className = "progress-header">

        <h3>
          Mode: {controller.pianoMode}
        </h3>
        
         {controller.pianoMode !== 'Free' ? <>
         <h3>{songTitle}</h3>
         
         <h3>
          {progressPercent !== "-1" ? 
          `Progress: ${progressPercent} % `: "" }</h3>
          
         </> :<></>}

         {controller.pianoMode === 'Play' ? <h3>
          {`Score: ${score}`}</h3> : <></>}

     </div>
    )
}


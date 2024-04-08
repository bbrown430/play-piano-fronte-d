import { useEffect, useState } from "react";
import {usePlayPianoController } from "../../App";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import "./playpageformatting.css"
import { useControllerMode, useScoreFromServer, useStatusFromServer } from "../utils/APIHooks";
import { progressProp } from "./SheetMusic";


export function ProgressHeader({progress}:progressProp){
    const controller = usePlayPianoController();
    const [songTitle,setSongTitle] = useState(controller.songTitle);
    const apiStatus = useStatusFromServer();
    //const progress = useProgressFromServer();
    const score = useScoreFromServer();
    const mode = useControllerMode();
    const [progressPercent,setProgressPercent] = useState("-1");


  
    useEffect(() => {

        const songTitleListener = () => {
            setSongTitle(controller.currentSong.title)
        }
        
        controller.addListener(PPEvents.SONG, songTitleListener);
        
        return () => {
            controller.removeListener(PPEvents.SONG, songTitleListener);

        };
      }, [controller]);
    
      useEffect(()=>{
        if(!progress){
          return
        }
        let percent = "-1"
        if(controller.currentSong.end && progress <= controller.currentSong.end){
          percent = (progress * 100 /controller.currentSong.end).toFixed();
        }

        controller.currentSong.progress = progress;

        if(apiStatus === 'Over'){
          percent = "100";
          controller.setStatus('Over');
        }

        setProgressPercent(percent)
      },[apiStatus, controller, progress])


    return (
        <div className = "progress-header">

        <h3>
          Mode: {controller.pianoMode}
        </h3>
        
         {controller.pianoMode !== 'Free' ? <>
         <h3>{songTitle}</h3>
         
         <h3>
          {progressPercent !== "-1" && mode === 'Learn'? 
          `Progress: ${progressPercent} % `: "" }</h3>
          
         </> :<></>}

         {controller.pianoMode === 'Play' ? <h3>
          {`Score: ${score.toFixed()}`}</h3> : <></>}

     </div>
    )
}


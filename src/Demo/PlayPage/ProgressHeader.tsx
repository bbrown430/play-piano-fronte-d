import { useEffect, useState } from "react";
import {usePlayPianoController } from "../../App";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import "./playpageformatting.css"
import { useProgressFromServer, useScoreFromServer, useStatusFromServer } from "../utils/APIHooks";

export function ProgressHeader(){
    const controller = usePlayPianoController();
    const [songTitle,setSongTitle] = useState(controller.songTitle);
    const apiStatus = useStatusFromServer();
    const progress = useProgressFromServer();
    const score = useScoreFromServer()
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
        let percent = "-1"
        if(controller.currentSong.end && progress <= controller.currentSong.end){
          percent = (progress * 100 /controller.currentSong.end).toFixed();
        }

        controller.currentSong.progress = progress;

        if(apiStatus === 'Over'){
          percent = "100";
        }

        setProgressPercent(percent)
      },[apiStatus, controller.currentSong, controller.currentSong.end, progress])


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


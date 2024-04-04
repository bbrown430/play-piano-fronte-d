import { useEffect, useState } from "react";
import { PPPATH, usePlayPianoController } from "../../App";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import { useNavigate } from "react-router";
import "./playpageformatting.css"
import { useProgressFromServer, useScoreFromServer } from "../utils/APIHooks";
import { usePause } from "../utils/utils";

export function ProgressHeader(){
    const controller = usePlayPianoController();
    const [songTitle,setSongTitle] = useState(controller.songTitle);
    const progress = useProgressFromServer();
    const scoreFromServer = useScoreFromServer()
    usePause()


  
    useEffect(() => {

        const songTitleListener = () => {
            setSongTitle(controller.currentSong.title)
        }
       
        controller.currentSong.progress = progress;

        controller.addListener(PPEvents.SONG, songTitleListener);
        
        return () => {
            controller.removeListener(PPEvents.SONG, songTitleListener);

        };
      }, [progress, controller, controller.pianoSound, controller.status, controller.songTitle]);
    


    return (
        <div className = "progress-header">

        <div 
          className = "song-title" 
          style={{width : '20%'}}>
          Mode: {controller.pianoMode}
        </div>

         {controller.pianoMode !== 'Free' ? <>
         <div className = "song-title">{songTitle}</div>
         
         <div className = "progress-bar">
          {`Progress: ${((controller.currentSong.progress ?? 0)/(controller.currentSong.end ?? 1) * 100).toFixed()}% `}</div>
          
         </> :<></>}

         {controller.pianoMode === 'Play' ? <div className = "progress-bar">
          {`Score: ${scoreFromServer}`}</div> : <></>}

     </div>
    )
}


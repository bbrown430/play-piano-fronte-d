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

        <h3>
          Mode: {controller.pianoMode}
        </h3>
        
         {controller.pianoMode !== 'Free' ? <>
         <h3>{songTitle}</h3>
         
         <h3>
          {`Progress: ${((controller.currentSong.progress ?? 0) * 100 / (controller.currentSong.end ?? 1)  ).toFixed()} % `}</h3>
          
         </> :<></>}

         {controller.pianoMode === 'Play' ? <h3>
          {`Score: ${scoreFromServer}`}</h3> : <></>}

     </div>
    )
}


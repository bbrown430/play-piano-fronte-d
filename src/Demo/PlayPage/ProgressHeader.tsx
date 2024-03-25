import { useEffect, useState } from "react";
import { PPPATH, usePlayPianoController } from "../../App";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import { useNavigate } from "react-router";
import "./playpageformatting.css"

export function ProgressHeader(){
    const controller = usePlayPianoController();
    const [songTitle,setSongTitle] = useState(controller.songTitle);
    const [progress,setProgress] = useState(controller.currentSong.progress);

    

    const nav = useNavigate();
    useEffect(() => {

        const songTitleListener = () => {
            setSongTitle(controller.currentSong.title)
        }
        const notePlayedListener = () => {
          setProgress(controller.currentSong.progress);
        };
        const pauseListener = () => {
                if (controller.isPaused()){
                    nav(PPPATH.PAUSED);}

        }


        controller.addListener(PPEvents.STATUS, pauseListener);
        controller.addListener(PPEvents.SONG, songTitleListener);
        controller.addListener(PPEvents.NOTEPLAYED, notePlayedListener);
        
        return () => {
            controller.removeListener(PPEvents.NOTEPLAYED, notePlayedListener);
            controller.removeListener(PPEvents.SONG, songTitleListener);
            controller.addListener(PPEvents.STATUS, pauseListener);



        };
      }, [controller, controller.pianoSound, controller.status, controller.songTitle, nav]);
    


    return (
        <div className = "progress-header">

         <div className = "song-title">{songTitle}</div>
        
         <div className = "progress-bar">
        
           {`you are ${((progress ?? 0)/(controller.currentSong.end ?? 0) * 100).toFixed()}  % finished with song`}
     </div>

     </div>
    )
}


import { useState } from "react";
import { usePlayPianoController } from "../../App";


interface ProgressHeaderProps {
    progress?: number;


    


}
export function ProgressHeader({progress}:ProgressHeaderProps){
    const controller = usePlayPianoController();
    const [songTitle,setSongTitle] = useState(controller.songTitle);


    return (
        <div className = "progress-header">
        <div className = "song-title"></div>
        <div className = "progress-bar"></div>

        </div>
    )
}


import { usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import hcbsheetmusic from "../../assets/SheetMusic/hot-cross-buns-midi/hot-cross-buns-midi.jpg"
import { useEffect, useState } from "react";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import { getSongBoundingBoxes } from "./songdata";
import { BoundingBox } from '../utils/types';
import PlayPianoController from "../../pianoStateController/PlayPianoController";
import { useActionOnKeyPress } from "../utils/lastKeyPressAPIHook";



 export default function PlayPage() {
    const controller = usePlayPianoController();

    const  startdisplaytest = () => {
        controller.status= 'Over';
        controller.currentSong = {boundingBoxes: getSongBoundingBoxes(),title: 'hot cross buns', progress : 0, end : 80};
        controller.startSong();    
    
    }

    const progressSong = () =>{
        if(controller.status !== 'inProgress' || !controller.currentSong.progress){
            return;
        }
        controller.currentSong.progress += 1;
    }

    const pause = ()=>{
        controller.status = 'Paused';
    }

    useActionOnKeyPress(progressSong)
    useActionOnKeyPress(pause,)
    
    return ( 
        <div className = "inProgress-container"

        onClick = {startdisplaytest}

        >
            <ProgressHeader />
            <SheetMusic/>

        </div>
    );
}

function SheetMusic(){
    const controller = usePlayPianoController();

    const [boundingBox,setBoundingbox] = useState<BoundingBox|undefined>(undefined);



    useEffect(()=>{
        const notePlayedListener = () => {
            if(controller.currentSong.boundingBoxes && controller.currentSong.progress){
            setBoundingbox(controller.currentSong.boundingBoxes[controller.currentSong.progress]);}
            console.log(`${boundingBox?.x},${boundingBox?.y},${boundingBox?.width},${boundingBox?.height}`)
          };

          controller.addListener(PPEvents.NOTEPLAYED,notePlayedListener);

          return () => {
            controller.removeListener(PPEvents.NOTEPLAYED,notePlayedListener)
          }

    },[controller.currentSong.progress, controller])

    return (

            <div className= "sheet-music" style={{backgroundImage: `url(${hcbsheetmusic}`, width: "100%"}}>
                {boundingBox? <div className="note-overlay"
                    style={{top:boundingBox.y,left:boundingBox.x,width:boundingBox.width,height:boundingBox.height}}></div> : <></>}
            </div>
    )

}
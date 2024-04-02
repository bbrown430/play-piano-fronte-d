import { usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import hcbsheetmusic from "../../assets/SheetMusic/hot-cross-buns-midi/hot-cross-buns-midi.jpg"
import { useEffect, useState } from "react";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import { getSongBoundingBoxes } from "./songdata";
import { BoundingBox } from '../utils/types';
import PlayPianoController from "../../pianoStateController/PlayPianoController";
import { useActionOnKeyPress, useStatusFromServer, useProgressFromServer } from "../utils/lastKeyPressAPIHook";


/**
 * enum for significant keyids
 */
export enum KEYID{
    PAUSE = 0,
}

 export default function PlayPage() {
    const controller = usePlayPianoController();

    const  startdisplaytest = () => {
        controller.status= 'Over';
        controller.currentSong = {boundingBoxes: getSongBoundingBoxes(),title: 'hot cross buns', progress : 0, end : 80}; 
    
    }


    const pause = ()=>{
        controller.status = 'Paused';
    }

    useActionOnKeyPress(pause,KEYID.PAUSE);
    
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

    const progress = useProgressFromServer();
    const songended = useStatusFromServer();

    useEffect(()=>{
            if(controller.currentSong.boundingBoxes){
            setBoundingbox(controller.currentSong.boundingBoxes[progress]);}
            console.log(`${boundingBox?.x},${boundingBox?.y},${boundingBox?.width},${boundingBox?.height}`)

    },[progress,songended])

    return (

            <div className= "sheet-music" style={{backgroundImage: `url(${hcbsheetmusic}`, width: "100%"}}>
                {boundingBox? <div className="note-overlay"
                    style={{top:boundingBox.y,left:boundingBox.x,width:boundingBox.width,height:boundingBox.height}}></div> : <></>}
            </div>
    )

}
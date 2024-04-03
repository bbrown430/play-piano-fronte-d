import { PPPATH, usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import hcbsheetmusic from "../../assets/SheetMusic/hot-cross-buns-midi/hot-cross-buns-midi.jpg"
import { useEffect, useState } from "react";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import { getSongBoundingBoxes } from "./songdata";
import { BoundingBox, PianoState } from '../utils/types';
import PlayPianoController from "../../pianoStateController/PlayPianoController";
import { useActionOnKeyPress, useStatusFromServer, useProgressFromServer, useControllerStatus } from "../utils/lastKeyPressAPIHook";
import { useNavigate } from "react-router";


/**
 * enum for significant keyids
 */
export enum KEYID{
    PAUSE = 0,
}

 export default function PlayPage() {
    const controller = usePlayPianoController();
    const nav = useNavigate();

    const statusAPI : PianoState  = useControllerStatus();


    const pause = ()=>{
        controller.status = 'Paused';
        nav(PPPATH.PAUSED);
    }

 

    useActionOnKeyPress(pause,KEYID.PAUSE);
    
    return ( 
        <div className = "inProgress-container"
        >
             <ProgressHeader/>
            {
                (()=>{
                    switch(statusAPI){
                        case "Waiting":
                            return  <StartSongPage/>

                        case "inProgress":
                            return <SheetMusic/>
                        case "Over":
                            return <EndScreen/>
                        default: 
                            return <></>
                    }
                })()
            }
            
        

        </div>
    );
}

function SheetMusic(){
    const controller = usePlayPianoController();

    const [boundingBox,setBoundingbox] = useState<BoundingBox|undefined>(undefined);

    const progress = useProgressFromServer();
    const status = useControllerStatus();

    useEffect(()=>{
            if(controller.currentSong.boundingBoxes && controller.currentSong.boundingBoxes.length > progress ){
            setBoundingbox(controller.currentSong.boundingBoxes[progress]);}
            console.log(`${boundingBox?.x},${boundingBox?.y},${boundingBox?.width},${boundingBox?.height}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[progress])

    return (

            <div className= "sheet-music" style={{backgroundImage: `url(${hcbsheetmusic}`, width: "100%"}}>
                {controller.status==='inProgress' && boundingBox ?
                 <div className="note-overlay"
                    style={{top:boundingBox.y
                        ,left:boundingBox.x
                        ,width:boundingBox.width
                        ,height:boundingBox.height}}/> 
                    : <></>}
            </div>
    )

}


function StartSongPage(){
        const controller = usePlayPianoController();

        //starts game on keypress
        const  startdisplaytest = () => {
            controller.status = 'inProgress';
            controller.currentSong = {boundingBoxes: getSongBoundingBoxes(),title: 'hot cross buns', progress : 0, end : 80}; 
        
        }

        useActionOnKeyPress(startdisplaytest);

        return (
            <div className = "start-page">Press ANY key to START</div>
        )
}

function EndScreen (){
    return (
        <></>
    )
}
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
    const statusAPI : PianoState  = useControllerStatus();
    
    return ( 
        <div className = "inProgress-container"
        >
             <ProgressHeader/>
            {
                (()=>{
                    switch(statusAPI){
                        case 'Menus':
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

    usePause(controller);

    useEffect(()=>{
            if(controller.currentSong.boundingBoxes && controller.currentSong.boundingBoxes.length > progress ){
            setBoundingbox(controller.currentSong.boundingBoxes[progress]);}
            console.log(`${boundingBox?.x},${boundingBox?.y},${boundingBox?.width},${boundingBox?.height}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[progress])

    return (

            <div className= "sheet-music">
                    <img 
                    id="sheetimg"
                style = {{position: 'absolute'}} 
                src={hcbsheetmusic} 
                alt="" ></img>

                {
                controller.status==='inProgress' && boundingBox ?
                 <div className="note-overlay"
                    /* style={{
                        top:boundingBox.y
                        ,left:boundingBox.x
                        ,width:boundingBox.width
                        ,height:boundingBox.height}} */
                        style={{
                            top: 0
                            ,left:0
                            ,width:100
                            ,height:100}}/> 
                    : <></>}

            </div>
    )

}


function usePause(controller: PlayPianoController) {
    const nav = useNavigate();
    const pause = () => {
        controller.status = 'Paused';
        nav(PPPATH.PAUSED);
    };



    useActionOnKeyPress(pause, KEYID.PAUSE);
}

function StartSongPage(){
        const controller = usePlayPianoController();

        //starts game on keypress
        const  startdisplaytest = () => {
            controller.status = 'inProgress';
            //@todo remove and place in song select button
            controller.currentSong = {boundingBoxes: getSongBoundingBoxes(),title: 'hot cross buns', progress : 0, end : 80}; 
        
        }

        useActionOnKeyPress(startdisplaytest);

        return (
            <div className = "start-page">
                <div className="start-button">Press ANY key to START</div>
                </div>
        )
}

function EndScreen (){
    return (
        <></>
    )
}
import { PPPATH, usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import hcbsheetmusic from "../../assets/SheetMusic/hot-cross-buns-midi/hot-cross-buns-midi.jpg"
import { useEffect, useState } from "react";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import { getSongBoundingBoxes } from "./songdata";
import { BoundingBox, PianoState } from '../utils/types';
import PlayPianoController from "../../pianoStateController/PlayPianoController";
import { useActionOnKeyPress, useStatusFromServer, useProgressFromServer, useControllerStatus, useScoreFromServer } from "../utils/lastKeyPressAPIHook";
import { useNavigate } from "react-router";


/**
 * enum for significant keyids
 */
export enum KEYID{
    PAUSE = 0,
}

 export default function PlayPage() {
    const statusAPI : PianoState  = useControllerStatus();
    const controller = usePlayPianoController();
    
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
                            if(controller.pianoMode==='Free'){
                                return <></>
                            }
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


  const getoffsets = () => {
    const element = document.getElementById("sheetimg");
    if(element){
    const rect = element.getBoundingClientRect();
    return {top:rect.top,left:rect.left}
    }
    return {top: 200,left:500}
  }


    return (

            <div className= "sheet-music">
                    <img 
                    id="sheetimg"
                    style = {{position: 'absolute'}} 
                    src={hcbsheetmusic} 
                    alt="" ></img>

                {
                controller.status === 'inProgress' && boundingBox ?
                 <div className="note-overlay"
                     style={{
                        top:boundingBox.y + getoffsets().top
                        ,left:boundingBox.x + getoffsets().left
                        ,width:boundingBox.width
                        ,height:boundingBox.height}} 
                        /> 
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
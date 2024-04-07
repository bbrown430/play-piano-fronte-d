import { PPPATH, usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import "../PlayPianoMenus/index.css"
import { useEffect, useState } from "react";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import { BoundingBox, PianoState } from '../utils/types';
import PlayPianoController from "../../pianoStateController/PlayPianoController";
import { useActionOnKeyPress, useProgressFromServer, useControllerStatus, useScoreFromServer } from "../utils/APIHooks";
import { usePause } from "../utils/utils";
import { getSongBoundingBoxes, getSongSheetMusic } from "../utils/songdata";
import MenuButton from "../PlayPianoMenus/button";
import { faArrowRotateForward, faMusic, faPlay, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { over } from "lodash";
import logo from '../../assets/play-piano-logo.svg';
import "../SplashScreen/index.css"


/**
 * enum for significant keyids
 */
export enum KEYID{
    PAUSE = 85,
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
                                return <div className="center-logo">
                                    <img
                                        src={logo}
                                        className="piano-logo-pulse"
                                        alt="logo"/>
                                </div>
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
    //@todo one day have a list of page breaks, and incriment when appropriate
        // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [pagenum, setPagenum] = useState(1);

    const [boundingBox,setBoundingbox] = useState<BoundingBox|undefined>(undefined);

    

    const APIstatus = useControllerStatus()
    const progress = useProgressFromServer();

    usePause();

    //updates bounding box coordinates 
    // and ends game if we reached the end of the song
    useEffect(  ()=>{
            if(controller.currentSong.boundingBoxes && controller.currentSong.boundingBoxes.length > progress ){
            setBoundingbox(controller.currentSong.boundingBoxes[progress]);}
            console.log(`${boundingBox?.x},${boundingBox?.y},${boundingBox?.width},${boundingBox?.height}`)

            
            if((controller.currentSong.end && progress >= controller.currentSong.end) || APIstatus=== 'Over'){
                controller.setStatus('Over');
            }
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

  let imgsrc; 
  try {imgsrc = require(`../../../public/data/${controller.currentSong.artist} - ${controller.currentSong.title }/data-${pagenum}.jpg`)
} catch(error){
    console.log('failed to load sheet music, displaying logo')
    imgsrc= logo;
} 



    return (

            <div className= "sheet-music">
                    {controller.currentSong.title === undefined ? <></>:<img 
                    id="sheetimg"
                    style = {{position: 'absolute'}} 
                    src={imgsrc} 
                    alt="" ></img>}

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



function StartSongPage(){
        const controller = usePlayPianoController();

        //starts game on keypress
        const  startdisplaytest = async () => {
            await controller.setStatus('inProgress');
            controller.setCurrentSong( {...controller.currentSong,
                progress: 0,
            })

            //@todo remove and place in song select button
            

            //const boundingBoxes  = await getSongBoundingBoxes(controller.currentSong.title||"");
           // controller.currentSong = {boundingBoxes: boundingBoxes,title: controller.currentSong.title, progress : 0, end : boundingBoxes.length}; 
        
        }

        useActionOnKeyPress(startdisplaytest);

        return (
            <div className = "start-page">
                <div className="start-button" onClick={startdisplaytest}>
                    <h2>Press any key to start!</h2>
                    </div>
                </div>
        )
}

function EndScreen (){
        const controller = usePlayPianoController();
        const nav = useNavigate();
      
        const restart = () => {
          controller.restartSong();
          nav(PPPATH.PLAY) };
      
        const changeSong = async () => {
          await controller.setStatus('Menus');
          nav(PPPATH.SONGSELECT)
        }
        const exitToModeSelect = async () => {
          await controller.setStatus('Menus');
          nav(PPPATH.MODESELECT)
        }
      
        return (
          <div className="menu-wrapper">
      
            <div className='menu-header'>
              Paused
              </div>
      
          <div className= "menu-row">
          
      </div>
      
      <div className= "menu-row"> 
          <MenuButton
              title='Restart'
              icon={faArrowRotateForward}
              text='restart current song from begining'
              action={restart} keyID={0} />
      
            <MenuButton 
              title='Change Song'
              icon={faMusic}
              text=''
              action={changeSong} keyID={1}/>
      
      
            <MenuButton
              title='Exit'
              icon={faX}
              text='End Song, Return to Menu'
              action={exitToModeSelect} keyID={3} />
      
      </div>   
      
          </div>
        );
      
      
      
}
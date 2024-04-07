import { PPPATH, usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import "../PlayPianoMenus/index.css"
import { useEffect, useState } from "react";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";
import { BoundingBox, PianoState } from '../utils/types';
import PlayPianoController from "../../pianoStateController/PlayPianoController";
import { useActionOnKeyPress, useProgressFromServer, useControllerStatus, useScoreFromServer, EVENTENDPOINT, KeyPress } from "../utils/APIHooks";
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
                                return                 <img
                                src={logo}
                                className="piano-logo"
                                alt="logo"/>
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
    const [imgsrc,setImgSrc] = useState(undefined); 
    const controller = usePlayPianoController();
    //@todo one day have a list of page breaks, and incriment when appropriate
        // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [pagenum, setPagenum] = useState(1);

    const [boundingBox,setBoundingbox] = useState<BoundingBox|undefined>(undefined);
    const [progress,setProgress] = useState(0);




    

    const APIstatus = useControllerStatus()

    usePause();

    useEffect( () => {
        const events = new EventSource(EVENTENDPOINT);
        if(controller.status==='Waiting'){
            setProgress(0);
        }
  
        events.onmessage = (event) => {
  
          const lastEvent = JSON.parse(event.data);
          const progress : number  = lastEvent.progress
  
  
  
          if(progress < 0 || progress === undefined){
            console.log(`returing before setting progress because :  ${progress}`)
  
            return;
          }
          console.log(`midi progress processed  ${progress}`)
          setProgress(prev=>prev+=1);
  
  
      }
      
  
      return () => {
        events.close();
      }
    }, [controller.status]);

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
    useEffect(  ()=>{
        let imgtemp;

  try {imgtemp = require(`../../assets/SheetMusic/${controller.currentSong.artist} - ${controller.currentSong.title }/data-${pagenum}.png`)
        } catch(error){
            console.log(`failed to load sheet music, displaying logo${`../../../public/data/${controller.currentSong.artist} - ${controller.currentSong.title }/data-${pagenum}.jpg`}`)
        imgtemp= logo;
    } 
        setImgSrc(imgtemp)
      
        
// eslint-disable-next-line react-hooks/exhaustive-deps
},[controller.currentSong.title])


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
          
        }

        useEffect(  () => {
            const events = new EventSource(EVENTENDPOINT);
    
           (async()=> {await controller.clearKeys();
            await controller.registerAllKeys();})();
    
      
            events.onmessage = (event) => {
      
              const keypressed = JSON.parse(event.data);
              const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
              console.log(`Key pressed id : ${keypress.keyID} keys listening for ANY`);
    
              if(keypress.keyID === undefined){
                console.log(`returning keypress :  ${keypress}`)
                return;
              }
              startdisplaytest();
    
    
        }
    
            return () => {
                events.close();
              }
    
          // eslint-disable-next-line react-hooks/exhaustive-deps
          },[controller])

        

        return (
            <div className = "start-page">
                <div className="start-button" onClick={startdisplaytest}>Press ANY key to START</div>
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
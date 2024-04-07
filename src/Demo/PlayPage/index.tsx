import { usePlayPianoController } from "../../App";
import { ProgressHeader } from "./ProgressHeader";
import "./playpageformatting.css"
import "../PlayPianoMenus/index.css"
import { useEffect, useState } from "react";
import { BoundingBox, PianoState } from '../utils/types';
import {  useControllerStatus, EVENTENDPOINT, KeyPress, useStatusFromServer } from "../utils/APIHooks";
import { sleep } from "../utils/utils";
import logo from '../../assets/play-piano-logo.svg';
import "../SplashScreen/index.css"
import { EndScreen } from "./EndScreen";
import { element } from "prop-types";


/**
 * enum for significant keyids
 */
export enum KEYID{
    PAUSE = 85,
}

 export default function PlayPage() {
    const statusAPI : PianoState  = useStatusFromServer();
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
    const [imgsrc,setImgSrc] = useState(undefined); 
    const controller = usePlayPianoController();
    //@todo one day have a list of page breaks, and incriment when appropriate
        // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [pagenum, setPagenum] = useState(1);

    const [boundingBox,setBoundingbox] = useState<BoundingBox|undefined>(undefined);
    const [progress,setProgress] = useState(0);

    
    const APIstatus = useControllerStatus()

    //ends when status from api or controller ends
    //@todo maybe @SymNC
   /* useEffect( ()=> {
        const events = new EventSource(EVENTENDPOINT);
  
        events.onmessage = (event) => {

            const lastEvent = JSON.parse(event.data);
            const apiStatus : PianoState  = lastEvent.status

        }


    })*/

    //updates progress
    useEffect( () => {
        (async () => {
            controller.clearKeys();}
        )()



        const events = new EventSource(EVENTENDPOINT);
  
        events.onmessage = (event) => {
  
          const lastEvent = JSON.parse(event.data);
          const progress : number  = lastEvent.progress
  
  
  
          if(progress < 0 || progress === undefined){
            console.log(`returing before setting progress because :  ${progress}`)
  
            return;
          }
          console.log(`midi progress processed  ${progress}`)
          setProgress((prev)=>prev+=1);
  
      }
      
  
      return () => {
        events.close();
      }
    }, [controller.pianoMode,controller.status,controller.currentSong.title]);

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

        if (controller.currentSong && controller.currentSong.title) {
            const safeTitle = controller.currentSong.title.replace(/[?']/g, '');
        
            try {
                imgtemp = require(`../../assets/SheetMusic/${controller.currentSong.artist} - ${safeTitle}/data-${pagenum}.png`);
            } catch(error) {
                console.log(`Failed to load sheet music, displaying logo: ../../../public/data/${controller.currentSong.artist} - ${safeTitle}/data-${pagenum}.jpg`);
                imgtemp = logo;
            }
        
            setImgSrc(imgtemp);
        } else {
            console.log("Current song title is undefined.");
            // Handle the case when current song title is undefined
        }
        
        
      
        
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
                    className="sheetimg"
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

       const  startdisplaytest = async () => {
            await controller.clearKeys();
            await sleep(50)
            await controller.setStatus('inProgress');
          
        }

        useEffect(  () => {
              //starts game on keypress
           
            const events = new EventSource(EVENTENDPOINT);

            const regkeys = async()=> {
                await controller.clearKeys();

                await controller.registerAllKeys();}
    
            regkeys();
    
      
            events.onmessage = (event) => {
      
              const keypressed = JSON.parse(event.data);
              const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
              console.log(`Key pressed id : ${keypress.keyID} keys listening for ANY`);
    
              if(keypress.keyID === undefined){
                console.log(`returning keypress :  ${keypress}`)
                return;
              }
              


              const startbutton = document.getElementById('start-button')
              if(startbutton){
                startbutton?.click();
            }
            }
    
    
        
    
            return () => {
                events.close();            
              }
    
          },[controller,controller.pianoMode,controller.status])

        

        return (
            <div className = "start-page">
                <div className="start-button" 
                id="start-button"
                
                onClick={startdisplaytest}>
                    <h2>Press any key to start!</h2>
                    </div>
                </div>
        )
}


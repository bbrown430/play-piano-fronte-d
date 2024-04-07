import { useNavigate } from "react-router";
import { PPPATH, usePlayPianoController } from "../../App";
import { KEYID } from "../PlayPage";
import { useEffect } from "react";
import { EVENTENDPOINT, KeyPress } from "./APIHooks";

/**
 * 
 * @param waitTime ms
 * @returns 
 */
export const sleep = async (waitTime: number) => new Promise(resolve => setTimeout(resolve, waitTime));


/**
 * hook that will set status to paused, and navigagte to the pause menu when the pause key is pressed
 * @param controller 
 */
 function usePause() {
    const controller = usePlayPianoController();
    const nav = useNavigate();

    useEffect( () => {
        const pause = async () => {
            await controller.setStatus('Paused');
            nav(PPPATH.PAUSED);
        };

        const events = new EventSource(EVENTENDPOINT);
  
        events.onmessage = (event) => {
  
          const keypressed = JSON.parse(event.data);
          const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
  
          console.log(`Key pressed id : ${keypress.keyID} keys listening for`);
  
          if(keypress.keyID === undefined){
            return;
          }
          if( keypress.keyID !== undefined){
              // eslint-disable-next-line eqeqeq
              if(keypress.keyID === 85){
                console.log('pausing with usePause Hook');
                pause();


              }
            }
          }
  
  
      
  
      return () => {
        events.close();
      }
    }, [controller, nav]);





    //useActionOnKeyPress(pause, KEYID.PAUSE);
}


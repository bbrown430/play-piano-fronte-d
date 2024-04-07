import { useNavigate } from "react-router";
import { PPPATH, usePlayPianoController } from "../../App";
import { useEffect } from "react";
import { EVENTENDPOINT, KeyPress } from "./APIHooks";

/**
 * 
 * @param waitTime ms
 * @returns 
 */
export const sleep = async (waitTime: number) => new Promise(resolve => setTimeout(resolve, waitTime));


const PAUSEKEYNUM = 85;
/**
 * hook that will set status to paused, and navigagte to the pause menu when the pause key is pressed
 * @param controller 
 */
 export function usePause() {
    const controller = usePlayPianoController();
    const nav = useNavigate();

    useEffect( () => {
        const pause = async () => {
            await controller.setStatus('Paused');
            await sleep(25);
            nav(PPPATH.PAUSED);
        };

        const buttoninit= async() => {
            await controller.clearKeys();
            await sleep(25);
            controller.registerKey(PAUSEKEYNUM);



        }

        buttoninit();

        const events = new EventSource(EVENTENDPOINT);
  
        events.onmessage = (event) => {
  
          const keypressed = JSON.parse(event.data);
          const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
  
          console.log(`Key pressed id : ${keypress.keyID} keys listening for ${PAUSEKEYNUM}`);
  
          if(keypress.keyID === undefined){
            return;
          }
              // eslint-disable-next-line eqeqeq
              if(keypress.keyID == PAUSEKEYNUM){
                console.log('pausing with usePause Hook');
                pause();
              }
            }
  
  
      
  
      return () => {
        events.close();
      }
    }, [controller, nav]);

}


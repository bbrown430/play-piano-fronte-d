import { forEach } from "lodash";
import React, { useEffect, useState } from "react";
import { INTERNALENDPOINTS, PianoState, PlayPianoControllerState } from "./types";

const EVENTENDPOINT = 'http://localhost:8080/api/events'

type KeyPress = {keyID: number, count: number};

/**
 * react hook that gets key presses from the server api.
 * updates whenvever a keypress event happens
 * @param keysToReport keys ids that this should report
 * @returns 
 */
export default function useKeyPressesFromServer(keysToReport?: number | number[]) {

  const [lastKeyPress, setLastKeyPress ] = useState(-1);
  const [lastKeyCount, setLastKeyCount] = useState(-1);

  useEffect( () => {
      const events = new EventSource(EVENTENDPOINT);

      events.onmessage = (event) => {

        const keypressed = JSON.parse(event.data);
        const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};

        console.log(`Key pressed id : ${keypress.keyID} keys listening for ${keysToReport}`);

        if(keysToReport !== undefined){
          if(typeof keysToReport === "number"){
            // eslint-disable-next-line eqeqeq
            if(keypress.keyID != keysToReport){
              console.log("returning key not needed first if");
              return;
            }
          }
            else if(!keysToReport.includes(keypress.keyID)){
              console.log("returning key not needed second if")
              return;

            }
        }
        console.log(`key pressed processed  ${keypress.keyID}`)
        setLastKeyPress(()=> keypress.keyID);
        setLastKeyCount(()=>keypress.count)


    }

    return () => {
      events.close();
    }
  }, [keysToReport]);

  return [lastKeyPress, lastKeyCount];
}


/**
 * 
 * @param action is run when a key is pressed. 
 * @param keyID optional specific keys that performs action when pressed
 */
export function useActionOnKeyPress(action : (keyID?:number)=> void, keyID?:number[] | number) {
  const [keyPressed, keyPresses] = useKeyPressesFromServer(keyID);
  const [ countProcecced, setCountroccessed] = useState(keyPresses);

  useEffect(()=>{
    //exit if no key has been pressed since making this hook
    if(keyPresses < 0 || keyPressed < 0 || keyPresses <= countProcecced){
      return;
    }
    setCountroccessed(prev=> prev+1);
    action(keyPressed);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[action, keyPresses]);
}

export function useProgressFromServer() {

  const [progress, setProgress ] = useState(-1);

  useEffect( () => {
      const events = new EventSource(EVENTENDPOINT);

      events.onmessage = (event) => {

        const lastEvent = JSON.parse(event.data);
        const progress : number  = lastEvent.progress

        if(progress < 0){

          return;
        }
        console.log(`midi progress processed  ${progress}`)
        setProgress(progress);


    }

    return () => {
      events.close();
    }
  }, []);

  return progress
}
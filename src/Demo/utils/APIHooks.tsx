import  { useEffect, useState } from "react";
import { PianoState, isPianoState,  } from "./types";
import { usePlayPianoController } from "../../App";
import { PPEvents } from "../../pianoStateController/PlayPianoEventHandler";

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

        if(keypress.keyID === undefined){
          return;
        }
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


export function useScoreFromServer() {
  const controller = usePlayPianoController();

  const [score, setScore ] = useState(-1);

  useEffect( () => {
      const events = new EventSource(EVENTENDPOINT);

      events.onmessage = (event) => {

        const lastEvent = JSON.parse(event.data);
        const score : number  = lastEvent.progress



        if(score < 0 || score===undefined){
          console.log(`returing before setting progress because :  ${score}`)

          return;
        }
        console.log(`midi progress processed  ${score}`)
        setScore(score);


    }

    return () => {
      events.close();
    }
  }, []);

  return score
}

export function useProgressFromServer() {
  
  const [progress, setProgress ] = useState(0);

  useEffect( () => {
      const events = new EventSource(EVENTENDPOINT);

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
  }, []);

  return progress
}

export function useStatusFromServer() {

  const controller = usePlayPianoController();
  const [status, setStatus ] = useState<PianoState>('Menus');

  useEffect( () => {
      const events = new EventSource(EVENTENDPOINT);

      events.onmessage = (event) => {

        const lastEvent = JSON.parse(event.data);
        const statusFromServer  = lastEvent.status


        if(!isPianoState(statusFromServer)){
          console.log(`status undefined ${statusFromServer}`)
          return;
        }
        if(statusFromServer)
        console.log(`midi progress processed  ${statusFromServer}`)
        controller.status = statusFromServer;
        setStatus(statusFromServer);


    }

    return () => {
      events.close();
    }
  }, [controller]);

  return status
}





export function useControllerStatus(){
  const controller = usePlayPianoController();
  const [pianoStatus,setPianoStatus] = useState(controller.status);

  useEffect(()=>{

    
  const statusListener = ()=>{
    setPianoStatus(controller.status);
  }

    controller.addListener(PPEvents.STATUS,statusListener)

    return ()=>{controller.removeListener(PPEvents.STATUS,statusListener)}
    
  },[controller, controller.status])
  return pianoStatus;
}
import { forEach } from "lodash";
import React, { useEffect, useState } from "react";


/**
 * react hook that gets key presses from the server api.
 * updates whenvever a keypress event happens
 * @param keyIDs 
 * @returns 
 */
export default function useKeyPressesFromServer(keyID?: number | number[]) {

  const [ lastKeyPress, setLastKeyPress ] = useState<number | undefined>(undefined);

  useEffect( () => {
      const events = new EventSource('http://localhost:8080/api/events');

      events.onmessage = (event) => {

        const keypressID: number = JSON.parse(event.data).keyID;
        console.log(`Key pressed id : ${keypressID} keys listening for ${keyID}`)

        if(keyID !== undefined){
          if(typeof keyID === "number"){
            // eslint-disable-next-line eqeqeq
            if(keypressID != keyID){
              console.log("returning key not needed first if")
              return;
            }
          }
            else if(!keyID.includes(keypressID)){
              console.log("returning key not needed second if")
              return;

            }
        }
        console.log(`key pressed processed  ${keypressID}`)
        setLastKeyPress(()=> JSON.parse(event.data).keyID);


    }

    return () => {
      events.close();
    }
  }, [keyID]);

  return lastKeyPress;
}


/**
 * 
 * @param action is run when a key is pressed. 
 * @param keyID optional specific keys that performs action when pressed
 */
export function useActionOnKeyPress(action : (keyID?:number)=> void, keyID?:number[] | number) {
  const keypressed = useKeyPressesFromServer(keyID);

  useEffect(()=>{
    if(!keypressed){
      return;
    }
    action(keypressed);
  },[action, keypressed]);
}
/* export default function registerKeyOfInterest(keyID:number,) {

    const [keyOfInterest, setKeyPressed] = React.useState(false);
  
  
  
    React.useEffect(()=>{
        fetch('/api/lastkeypress')
        .then(res=>res.json())
        .then(data=>{
            if(data === keyID)
            setKeyPressed(true)
        ;});
      },[])
  
    return keyOfInterest;
  } */
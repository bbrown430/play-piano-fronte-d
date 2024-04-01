import { forEach } from "lodash";
import React, { useEffect, useState } from "react";


/**
 * react hook that gets key presses from the server api.
 * updates whenvever a keypress event happens
 * @param keyIDs 
 * @returns 
 */
export default function useKeyPressesFromServer(...keyIDs : number[]) {

  const [ lastKeyPress, setLastKeyPress ] = useState<number | undefined>(undefined);

  useEffect( () => {
      const events = new EventSource('http://localhost:8080/api/events');

      events.onmessage = (event) => {

        //@TODO if keyid==one of passed given keyIDS
        const keypressID = JSON.parse(event.data).keyID;
        if(keyIDs.length > 0 && !keyIDs.includes(keypressID)){
          return;
        }
        setLastKeyPress(()=> JSON.parse(event.data).keyID);


    }

    return () => {
      events.close();
    }
  }, [keyIDs]);

  return lastKeyPress;
}


/**
 * 
 * @param action is run when a key is pressed. 
 * @param keyID optional specific keys that performs action when pressed
 */
export function useActionOnKeyPress(action : (keyID?:number)=> void,...keyID:number[]) {
  const keypressed = useKeyPressesFromServer(...keyID);

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
import React, { useEffect, useState } from "react";


export default function useLastKeyPress(keyIDs?:number[], keyID?:number,) {

  const [ lastKeyPress, setLastKeyPress ] = useState<number | undefined>(undefined);

  useEffect( () => {
      const events = new EventSource('http://localhost:8080/api/events');

      events.onmessage = (event) => {
        //@TODO if keyid==one of passed given keyIDS
        setLastKeyPress(()=> JSON.parse(event.data).keyID);
    }

    return () => {
      events.close();
    }
  }, []);

  return lastKeyPress;
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
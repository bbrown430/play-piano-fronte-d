import "../ModePage/index.css"
import { PauseMenu } from '../PlayPianoMenus/PauseMenu';
import { useEffect, useState } from "react";
import { usePlayPianoController } from "../../App";
import MenuButton from "../PlayPianoMenus/button";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import useKeyPressesFromServer from "./APIHooks";
import { getSongBoundingBoxes } from "./songdata";


let x = 0;
export function Debug(){


//  const lastKeyPress = useKeyPressesFromServer();

  const controller = usePlayPianoController();


  const [pianoSound, setPianoSound] = useState(controller.pianoSound);
  const [songTitle,setSongTitle] = useState(controller.songTitle);
  const [pianoMode,setPianoMode] = useState(controller.pianoMode);
  const [pianoStatus,setPianoStatus] = useState(controller.status);
 


  useEffect(() => {
    console.log('effect run')
    const updatePageListener = () => {
      setPianoSound(controller.pianoSound);
      setSongTitle(controller.songTitle);
      setPianoMode(controller.pianoMode);
      setPianoStatus(controller.status);
    };
    controller.addListener('soundChange',updatePageListener);
    return () => {
      controller.removeListener('soundChange',updatePageListener)
    };
  }, [controller, controller.pianoSound,controller.pianoMode,controller.status,controller.songTitle]);

  return (
    <div className="menu-wrapper">
      <title>debug</title>
      <ol>
        <li>{`current game state information`}</li>
        <li>{`${pianoMode}`}</li>
        <li>{`${pianoStatus}`}</li>
        <li>{`${pianoSound}`}</li>
        <li>{`song = ${songTitle}`}</li>
        <MenuButton 
          title='post keypress'
          icon={faCross}
          text='Exit to main menu'
          action={() => {
            //setTestKeyPress((prev)=>prev + 1);
            fetch('/api/lastkeypress', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({ keyID: x++ }),
            });
          }} 
          keyID={0} />


        


      </ol>
              

    </div>
  );


}


export default PauseMenu;



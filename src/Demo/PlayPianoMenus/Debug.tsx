import "./index.css"
import { PauseMenu } from './PauseMenu';
import { useEffect, useState } from "react";
import { log } from "console";
import { usePlayPianoController } from "../../App";
import { getSongBoundingBoxes } from "../PlayPage/songdata";


export function Debug(){

  const controller = usePlayPianoController()


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
        <li>{`${getSongBoundingBoxes()}`}</li>

        


      </ol>
              

    </div>
  );


}


export default PauseMenu;

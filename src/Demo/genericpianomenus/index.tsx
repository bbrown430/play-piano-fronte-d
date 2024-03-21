import "./index.css"
import { PauseMenu } from './PauseMenu';
import { useEffect, useState } from "react";
import { log } from "console";
import { usePlayPianoController } from "../../App";


export function Debug(){

  const controller = usePlayPianoController()


  const [pianoSound, setPianoSound] = useState(controller.pianoSound);

  useEffect(() => {
    console.log('effect run')
    const updateSoundListener = () => {
      setPianoSound(controller.pianoSound);
    };
    controller.addListener('soundChange',updateSoundListener);
    return () => {
      console.log('debug exit')
      controller.removeListener('soundChange',updateSoundListener)
    };
  }, [controller, controller.pianoSound]);

  return (
    <div className="menu-wrapper">
      <title>debug</title>
      <ol>
        <li>{`current game state information`}</li>
        <li>{`${controller.pianoMode}`}</li>
        <li>{`${controller.status}`}</li>
        <li>{`${pianoSound}`}</li>
        <li>{`song = ${4}`}</li>

        


      </ol>
              

    </div>
  );


}


export default PauseMenu;

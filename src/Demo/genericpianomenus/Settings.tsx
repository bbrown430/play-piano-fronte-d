import MenuButton from './button';
import { faMusic, faPlay, faWrench } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { PianoSound, PianoState } from '../../pianoStateController/PlayPianoController';
import { usePlayPianoController } from '../../App';



export function Settings() {
  const controller = usePlayPianoController();

  const [pianoSound, setPianoSound] = useState<PianoSound>(controller.pianoSound);
  const [pianoState, setPianoState] = useState<PianoState>(controller.status);




  return (
    <div className="menu-wrapper">

      <div className='menu-header'>
        <p>Settings</p>
      </div>

      <MenuButton 
        title='Sound'
        icon={faMusic}
        text={pianoSound}
        action={ ()=> {
          controller.changeSoundMode();
          setPianoSound(controller.pianoSound);}}
          />

      <MenuButton 
        title='unpause'
        icon={faPlay}
        text=''
        action={()=>{
          controller.status = 'inProgress'; 
          setPianoState(controller.status);

        }} />




    </div>
  );
}

import MenuButton from './button';
import { faCross, faMusic, faPlay, faWrench } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { PianoSound, PianoState } from '../../pianoStateController/PlayPianoController';
import { PPPATH, usePlayPianoController } from '../../App';
import { useNavigate } from 'react-router';



export function Settings() {
  const controller = usePlayPianoController();

  const [pianoSound, setPianoSound] = useState<PianoSound>(controller.pianoSound);
  const nav = useNavigate();




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
        title='Exit'
        icon={faCross}
        text='Exit to main menu'
        action={()=>{
        nav(PPPATH.MODESELECT);

        }} />




    </div>
  );
}

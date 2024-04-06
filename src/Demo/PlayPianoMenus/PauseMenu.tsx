import MenuButton from './button';
import { faArrowRotateForward, faMusic, faPlay, faX } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';
import { PPPATH, usePlayPianoController } from '../../App';
import { sleep } from '../utils/utils';
import { MIDDLE10KEYS } from '../utils/types';

export function PauseMenu() {
  const controller = usePlayPianoController();
  const nav = useNavigate();

  const restart = async () => {
    if(controller.pianoMode==='Free'){
      return;
    }
    await controller.restartSong();
    nav(PPPATH.PLAY) };

  const unpause = async () => {
    await controller.unPause(); 
    nav(PPPATH.PLAY);
  };

  const changeSong = async () => {
    await controller.setStatus('Over');
    await controller.setStatus('Menus');
    nav(PPPATH.SONGSELECT)
  }
  const exitToModeSelect = async () => {
    await controller.setStatus('Over');
    await controller.setStatus('Menus');
    nav(PPPATH.MODESELECT)
  }

  return (
    <div>
      <h1 className='sticky-header'>
        Pause Menu
      </h1>

    <div className= "pause-select">
      <MenuButton
        title='Restart'
        icon={faArrowRotateForward}
        text=''
        action={restart}
        keyID={MIDDLE10KEYS[3]}
        colorID={0}  />

      <MenuButton 
        title='Change Song'
        icon={faMusic}
        text=''
        action={changeSong} keyID={MIDDLE10KEYS[4]}
        colorID={1}/>

      <MenuButton
        title='Resume'
        icon={faPlay}
        text=''
        action={unpause} 
        keyID={MIDDLE10KEYS[5]}
        colorID={2} />

      <MenuButton
        title='Exit'
        icon={faX}
        text=''
        action={exitToModeSelect}
        keyID={MIDDLE10KEYS[6]}
        colorID={3} />
</div>   

    </div>
  );
}



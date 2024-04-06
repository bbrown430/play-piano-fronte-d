import MenuButton from './button';
import { faArrowRotateForward, faMusic, faPlay, faX } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';
import { PPPATH, usePlayPianoController } from '../../App';

export function PauseMenu() {
  const controller = usePlayPianoController();
  const nav = useNavigate();

  const restart = () => {
    controller.restartSong();
    nav(PPPATH.PLAY) };

  const unpause = () => {
    controller.unPause(); 
    nav(PPPATH.PLAY);
  };

  const changeSong = async () => {
    await controller.setStatus('Menus');
    nav(PPPATH.SONGSELECT)
  }
  const exitToModeSelect = async () => {
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
        action={restart} keyID={0} />

      <MenuButton 
        title='Change Song'
        icon={faMusic}
        text=''
        action={changeSong} keyID={1}/>

      <MenuButton
        title='Resume'
        icon={faPlay}
        text=''
        action={unpause} keyID={2} />

      <MenuButton
        title='Exit'
        icon={faX}
        text=''
        action={exitToModeSelect} keyID={3} />
</div>   

    </div>
  );
}



import MenuButton from './button';
import { faArrowRotateForward, faPlay, faWrench } from '@fortawesome/free-solid-svg-icons';
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
    controller.status = 'inProgress';
    nav(PPPATH.PLAY);
  };

  const changeSong = () => {
    controller.status = 'Menus';
    nav(PPPATH.SONGSELECT)
  }

  return (
    <div className="menu-wrapper">

      <div className='menu-header'>
        <p>Paused</p>
        </div>

      <MenuButton
        title='restart'
        icon={faArrowRotateForward}
        text='restart current song from begining'
        action={restart} keyID={0} />

      <MenuButton 
        title='Change Song'
        icon={faWrench}
        text=''
        action={changeSong} keyID={1}/>

      <MenuButton
        title='unpause'
        icon={faPlay}
        text=''
        action={unpause} keyID={2} />

    </div>
  );
}



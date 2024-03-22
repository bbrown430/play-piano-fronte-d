import MenuButton from './button';
import { faArrowRotateForward, faPlay, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
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

  const changeSong= () => {
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
        action={restart} />

      <MenuButton 
      
      title='Change Song'
      icon={faWrench}
      text=''
      action={changeSong}/>

      <MenuButton

        title='unpause'
        icon={faPlay}
        text=''
        action={unpause} />






    </div>
  );
}



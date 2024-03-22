import MenuButton from './button';
import { faArrowCircleUp, faPlay, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { usePlayPianoController } from '../../App';

export function PauseMenu() {
  const controller = usePlayPianoController();

  let restart = () => {controller.restartSong(); };
  let unpause = () => {controller.unPause(); };
  return (
    <div className="menu-wrapper">

      <div className='menu-header'>
        <p>Paused</p>
        </div>

      <MenuButton
        title='restart'
        icon={faArrowCircleUp}
        text=''
        action={restart} />
      <MenuButton
        title='unpause'
        icon={faPlay}
        text=''
        action={unpause} />
      <Link to ='./'>
      <MenuButton 
      
        title='settings'
        icon={faWrench}
        text=''
        action={unpause}/>
        </Link>


    </div>
  );
}



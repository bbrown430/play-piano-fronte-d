import MenuButton from './button';
import { faArrowCircleUp, faPlay, faWrench } from '@fortawesome/free-solid-svg-icons';
import { MenuProps } from '.';

export function PauseMenu({ controller }: MenuProps) {
  let restart = () => { controller.restartSong(); };
  let unpause = () => { controller.unPause(); };
  return (
    <div className="menu-wrapper">

      <div className='menu-header'>
        <p>Paused</p>
        </div>

      <MenuButton controller={controller}
        title='restart'
        icon={faArrowCircleUp}
        text=''
        action={restart} />
      <MenuButton controller={controller}
        title='unpause'
        icon={faPlay}
        text=''
        action={unpause} />
      <MenuButton controller={controller}
      
        title='settings'
        icon={faWrench}
        text=''
        action={unpause} />


    </div>
  );
}

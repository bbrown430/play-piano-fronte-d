import ModeCard from './ModeCard';
import {faGamepad, faChalkboardTeacher, faBullseye, faMagicWandSparkles, faWrench, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import "./index.css"
import { PPPATH, usePlayPianoController} from '../../App';
import MenuButton from '../PlayPianoMenus/button';
import { useNavigate } from 'react-router';
import { WhiteKeys } from '../utils/types';

//move to the page for modes, buttons select the mode function buttonAction = {}=>
function ModeSelect() {
  const nav = useNavigate();
  const controller = usePlayPianoController();

  const clickFreePlay = ()=>{
    controller.status='Waiting'
    nav(PPPATH.PLAY)
  }

  return (
    <div >
      <h1 className='sticky-header'>
        Select Mode
      </h1>
    <div className="mode-select">
      <ModeCard
        mode= 'Learn'
        icon={faChalkboardTeacher}
        text="Learn how to play your favorite songs with gentle pacing to match your skills."
        keyID={WhiteKeys[17]}
        colorID={0}
                />
      <ModeCard 
        mode='Play'
        icon={faGamepad}
        text='Play along to your favorite songs and go for a new high score!'
        keyID={WhiteKeys[18]}
        colorID={1}                />

      <ModeCard 
        mode="Free"
        icon={faPaintBrush}
        text='Play around and watch the lights dance around your fingers.' 
        keyID={WhiteKeys[19]}  
        colorID={2}      
        action={clickFreePlay}        />

     </div>

    {/*   <MenuButton 
        title={'Settings'} 
        icon={faWrench} 
        text={'...'} 
        action={()=> nav(PPPATH.SETTINGS)}
        keyID={4} />     */}
    </div>
  );
}


export default ModeSelect;

import ModeCard from './ModeCard';
import {faGamepad, faChalkboardTeacher, faBullseye, faMagicWandSparkles, faWrench } from '@fortawesome/free-solid-svg-icons';
import "./index.css"
import { PPPATH} from '../../App';
import MenuButton from '../PlayPianoMenus/button';
import { useNavigate } from 'react-router';

//move to the page for modes, buttons select the mode function buttonAction = {}=>
function ModeSelect() {

  return (
    <div className='mode-page-container'>
      <text className='menu-header'>
        Select Mode
      </text>
    <div className="mode-select">
      <ModeCard
        mode= 'Learn'
        icon={faChalkboardTeacher}
        text="Learn to play the piano"
        keyID={0}
                />

      <ModeCard 
        mode='Play'
        icon={faGamepad}
        text='Play along, and go for a high score'
        keyID={1}                />
        </div>

    <div className='mode-select'>
      <ModeCard 
        mode="Free"
        icon={faBullseye}
        text='Free play mode' 
        keyID={2}        
        link={PPPATH.PLAY}         />

      <ModeCard
        mode="Magic"
        icon={faMagicWandSparkles}
        text='Watch the piano magically playing itself' 
        keyID={3}               />

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

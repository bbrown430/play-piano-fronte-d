import ModeCard from './ModeCard';
import {faGamepad, faChalkboardTeacher, faBullseye, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import "./index.css"
import PlayPianoController from '../../pianoStateController/PlayPianoController';

//move to the page for modes, buttons select the mode function buttonAction = {}=>

function ModeSelect() {
  return (
    <div className="mode-select">
      <ModeCard 
                title="Learn"
                icon={faChalkboardTeacher}
                text="Learn to play by following the led board"
                link='' 
                />

      <ModeCard 
                title="Play" 
                icon={faGamepad}
                text=''
                link=''
                />

      <ModeCard 
                title="Free" 
                icon={faBullseye}
                text='Free play mode'
                link=''
                 />

      <ModeCard
                title="Magic" 
                icon={faMagicWandSparkles} 
                text='select song, and watch the piano magically playing itself' 
                link=''/>
    </div>
  );
}


export default ModeSelect;

import ModeCard from './ModeCard';
import {faGamepad, faChalkboardTeacher, faBullseye, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import "./index.css"
import PlayPianoController from '../../pianoStateController/PlayPianoController';

//move to the page for modes, buttons select the mode function buttonAction = {}=>
interface ModeSelectProps{
  controller : PlayPianoController
}

function ModeSelect({controller}:ModeSelectProps) {
  return (
    <div className="mode-select">
      <ModeCard controller={controller}
                title="Learn"
                icon={faChalkboardTeacher}
                text="Learn to play by following the led board"
                link='' 
                />

      <ModeCard controller={controller}
                title="Play" 
                icon={faGamepad}
                text=''
                link=''
                />

      <ModeCard controller={controller}
                title="Free" 
                icon={faBullseye}
                text='Free play mode'
                link=''
                 />

      <ModeCard controller={controller}
                title="Magic" 
                icon={faMagicWandSparkles} 
                text='select song, and watch the piano magically playing itself' 
                link=''/>
    </div>
  );
}

export default ModeSelect;

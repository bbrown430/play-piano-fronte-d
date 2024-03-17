import MenuButton from './button';
import {faGamepad, faChalkboardTeacher, faBullseye, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import "./index.css"

//move to the page for modes, buttons select the mode function buttonAction = {}=>

function PianoMenu() {
  return (
    <div className="menu-wrapper">
      <MenuButton 
                />

      <menuButton title="Play" 
                icon={faGamepad}
                text=''
                link=''
                />

      <menuButton title="Free" 
                icon={faBullseye}
                text='Free play mode'
                link=''
                 />

      <menuButton title="Magic" 
                icon={faMagicWandSparkles} 
                text='select song, and watch the piano magically playing itself' 
                link=''/>
    </div>
  );
}

export default PianoMenu;

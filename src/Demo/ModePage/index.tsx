/* eslint-disable eqeqeq */
import ModeCard from './ModeCard';
import {faGamepad, faChalkboardTeacher, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import "./index.css"
import { PPPATH, usePlayPianoController} from '../../App';
import { useNavigate } from 'react-router';
import { ButtonColors } from '../utils/types';
import { useEffect } from 'react';
import { EVENTENDPOINT, KeyPress } from '../utils/APIHooks';

const LEARNBUTTON = {
  BUTTON:28,
  COLOR: ButtonColors[0]
}
const PLAYBUTTON = {
  BUTTON:31,
  COLOR: ButtonColors[1]
}
const FREEBUTTON = {
  BUTTON:35,
  COLOR: ButtonColors[2]
}
//move to the page for modes, buttons select the mode function buttonAction = {}=>
function ModeSelect() {
  const nav = useNavigate();
  const controller = usePlayPianoController();

  const clickFreePlay = async ()=>{
    await controller.setPianoMode('Free');
    await controller.setStatus('Waiting');
    nav(PPPATH.PLAY)
  }



  /** Registers Mode Select buttons 
   *  sets up HTTP Event Listener for Pressing them with keys */
  useEffect( () => {
    const events = new EventSource(EVENTENDPOINT);
    const setupButtons = async ()=>{
        await controller.registerKey(LEARNBUTTON.BUTTON,LEARNBUTTON.COLOR)
        await controller.registerKey(PLAYBUTTON.BUTTON,PLAYBUTTON.COLOR)
        await controller.registerKey(FREEBUTTON.BUTTON,FREEBUTTON.COLOR)
      }

    setupButtons();

    events.onmessage = (event) => {

      const keypressed = JSON.parse(event.data);
      const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
      console.log(`Key pressed id : ${keypress.keyID} keys listening for 28 31 35`);

      if(keypress.keyID ===undefined){
        console.log(`returning keypress :  ${keypress}`)
        return;
      }
      //learn
      if(keypress.keyID == 28 ){

      const element = document.getElementById('Learn');
      if(element){
      element?.click();
      console.log('attempting to click position 3 card');
      }
    }//play
      else if(keypress.keyID == 31){
         const element = document.getElementById('Play');
        if(element){
       element?.click();
       console.log('attempting to click position  play card');

      }
    }else if(keypress.keyID == 35){

        const element = document.getElementById('Free');
        if(element){
         element?.click();
         console.log('attempting to click position  play card');
      };
    }
  }

    return () => {
        events.close();
      }

  },[controller,controller.pianoMode,controller.status])

  return (
    <div>
      <h1 className='sticky-header'>
        Select Mode
      </h1>
    <div className="mode-select">
      <ModeCard
        mode= 'Learn'
        icon={faChalkboardTeacher}
        text="Learn how to play your favorite songs with gentle pacing to match your skills."
        colorID={0}
                />
      <ModeCard 
        mode='Play'
        icon={faGamepad}
        text='Play along to your favorite songs and go for a new high score!'
        colorID={1}                />

      <ModeCard 
        mode="Free"
        icon={faPaintBrush}
        text='Play around and watch the lights dance around your fingers!' 
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

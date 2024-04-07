import MenuButton from './button';
import { faArrowRotateForward, faMusic, faPlay, faX } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';
import { PPPATH, usePlayPianoController } from '../../App';
import { sleep } from '../utils/utils';
import { ButtonColors, MIDDLE10KEYS } from '../utils/types';
import { useEffect } from 'react';
import { EVENTENDPOINT, KeyPress } from '../utils/APIHooks';

export function PauseMenu() {
  const controller = usePlayPianoController();
  const nav = useNavigate();

  const restart = async () => {
    if(controller.pianoMode==='Free'){
      return;
    }
    await controller.restartSong();
    nav(PPPATH.PLAY) };

  const unpause = async () => {
    await controller.unPause(); 
    nav(PPPATH.PLAY);
  };

  const changeSong = async () => {
    await controller.setStatus('Over');
    await controller.setStatus('Menus');
    nav(PPPATH.SONGSELECT)
  }
  const exitToModeSelect = async () => {
    await controller.setStatus('Over');
    await controller.setStatus('Menus');
    nav(PPPATH.MODESELECT)
  }
  useEffect( () => {


    const events = new EventSource(EVENTENDPOINT);
    const setupButtons = async ()=>{
        await controller.clearKeys();
        await controller.setKeyColor(26,ButtonColors[0])
        await controller.setKeyColor(29,ButtonColors[1])
        await controller.setKeyColor(33,ButtonColors[2])
        await controller.setKeyColor(36,ButtonColors[3])

      }

    setupButtons();

    events.onmessage = (event) => {

      const keypressed = JSON.parse(event.data);
      const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
      console.log(`Key pressed id : ${keypress.keyID} keys listening for 29 31 33`);

      if(keypress.keyID ===undefined){
        console.log(`returning keypress :  ${keypress}`)
        return;
      }
      if(keypress.keyID == 26 ){

        const element = document.getElementById('Restart');
        if(element){
        element?.click();
        console.log('attempting to click position 3 card');
        }
      }//play
      //learn
      else if(keypress.keyID == 29 ){

      const element = document.getElementById('Change Song');
      if(element){
      element?.click();
      console.log('attempting to click position 3 card');
      }
    }//play
      else if(keypress.keyID == 33){
         const element = document.getElementById('Resume');
        if(element){
       element?.click();
       console.log('attempting to click position  play card');

      }
    }else if(keypress.keyID == 36){

        const element = document.getElementById('Exit');
        if(element){
         element?.click();
         console.log('attempting to click position  play card');
      };
    }
  }

    return () => {
        events.close();
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <div>
      <h1 className='sticky-header'>
        Pause Menu
      </h1>

    <div className= "pause-select">
      <MenuButton
        title='Restart'
        icon={faArrowRotateForward}
        text=''
        action={restart}
        keyID={MIDDLE10KEYS[3]}
        colorID={0}  />

      <MenuButton 
        title='Change Song'
        icon={faMusic}
        text=''
        action={changeSong} keyID={MIDDLE10KEYS[4]}
        colorID={1}/>

      <MenuButton
        title='Resume'
        icon={faPlay}
        text=''
        action={unpause} 
        keyID={MIDDLE10KEYS[5]}
        colorID={2} />

      <MenuButton
        title='Exit'
        icon={faX}
        text=''
        action={exitToModeSelect}
        keyID={MIDDLE10KEYS[6]}
        colorID={3} />
</div>   

    </div>
  );
}



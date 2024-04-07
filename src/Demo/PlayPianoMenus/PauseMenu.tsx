/* eslint-disable eqeqeq */
import MenuButton from './button';
import { faArrowRotateForward, faMusic, faPlay, faX } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';
import { PPPATH, usePlayPianoController } from '../../App';
import { sleep } from '../utils/utils';
import { ButtonColors, MIDDLE10KEYS } from '../utils/types';
import { useEffect, useState } from 'react';
import { EVENTENDPOINT, KeyPress, useControllerMode, useControllerStatus, useStatusFromServer } from '../utils/APIHooks';

export function PauseMenu(){
  const mode = useControllerMode();

  return (
    mode === 'Free' ? <FreePauseMenu/> :
    mode === 'Learn' || mode === 'Play' ? <PauseMenuLP/> :
    mode === 'Magic' ? <div className='sticky-header'>You Dont Belong here. Magic is NOT Real</div> :
    <></>)
}

/**
 * 
 * @returns pause menu to load when in learn or play mode
 */
function PauseMenuLP() {
  const controller = usePlayPianoController();
  const nav = useNavigate();
  const status = useControllerStatus();

  const restart = async () => {
    if(controller.pianoMode==='Free'){
      return;
    }
    await controller.restartSong();
    nav(PPPATH.PLAY) 
    };

  const unpause = async () => {

    await controller.setStatus('inProgress')
    await sleep(30);
    nav(PPPATH.PLAY);
  };

  const changeSong = async () => {
    await controller.setStatus('Over');
    await sleep(50)
    await controller.setStatus('Menus');
    nav(PPPATH.SONGSELECT);
  }
  const exitToModeSelect = async () => {
    await controller.setStatus('Over');
    await sleep(50);
    await controller.setStatus('Menus');
    nav(PPPATH.MODESELECT);
  }
  useEffect( () => {


    const events = new EventSource(EVENTENDPOINT);
    const setupButtons = async ()=>{
       // await controller.clearKeys();
        await controller.registerKey(26,ButtonColors[0])
        await controller.registerKey(29,ButtonColors[1])
        await controller.registerKey(33,ButtonColors[2])
        await controller.registerKey(36,ButtonColors[3])

      }

    setupButtons();

    events.onmessage = (event) => {

      const keypressed = JSON.parse(event.data);
      const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
      console.log(`Key pressed id : ${keypress.keyID} keys listening for 26 29 33 36`);

      if(keypress.keyID === undefined){
        console.log(`returning keypress :  ${keypress}`)
        return;
      }

      if(keypress.keyID == 26 ){
         const element = document.getElementById('Resume');
         if(element){
           element?.click();
           //console.log('attempting to click position 3 card');
        }
      }//play
      //learn
      else if(keypress.keyID == 29 ){

      const element = document.getElementById('Change Song');
      if(element){
      element?.click();
      }
    }//play
      else if(keypress.keyID == 33){ 
        const element = document.getElementById('Restart');
        if(element){
        element?.click();
       
      // console.log('attempting to click position  play card');

      }
    } else if(keypress.keyID == 36){

        const element = document.getElementById('Exit');
        if(element){
         element?.click();
        // console.log('attempting to click position  play card');
      };
    }
  }

    return () => {
        events.close();
      }

  },[status,controller, controller.status,controller.pianoMode])
  
  return (
    <div>
      <h1 className='sticky-header'>
        Pause Menu
      </h1>


    <div className= "pause-select">
      <MenuButton
        title='Resume'
        icon={faPlay}
        text=''
        action={unpause} 
        keyID={26}
        colorID={2} />

      {controller.pianoMode !== 'Free' ?  <MenuButton
        title='Restart'
        icon={faArrowRotateForward}
        text=''
        action={restart}
        keyID={29}
        colorID={0}  /> : <></>}

{controller.pianoMode !== 'Free' ?  
      <MenuButton 
        title='Change Song'
        icon={faMusic}
        text=''
        action={changeSong} 
        keyID={33}
        colorID={1}/> : <></>}

      <MenuButton
        title='Exit'
        icon={faX}
        text=''
        action={exitToModeSelect}
        keyID={36}
        colorID={3} />
</div>   

    </div>
  );
}


function FreePauseMenu() {
  const controller = usePlayPianoController();
  const nav = useNavigate();
  const status =  useControllerStatus();


  const unpause = async () => {
    await controller.setStatus('inProgress');
    await sleep(50);
    nav(PPPATH.PLAY);
  };

  const exitToModeSelect = async () => {
    await controller.setStatus('Over');
    await sleep(50);
    await controller.setStatus('Menus');
    nav(PPPATH.MODESELECT);
  }

  useEffect( () => {


    const events = new EventSource(EVENTENDPOINT);

    const setupButtons = async ()=>{
        //await controller.clearKeys();
        //sleep(50);
        await controller.registerKey(26,ButtonColors[0])
        await controller.registerKey(36,ButtonColors[3])

      }

    setupButtons();

    events.onmessage = (event) => {

      const keypressed = JSON.parse(event.data);
      const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
      console.log(`Key pressed id : ${keypress.keyID} keys listening for 26 36`);

      if(keypress.keyID ===undefined){
        console.log(`returning keypress :  ${keypress}`)
        return;
      }

      if(keypress.keyID == 26){
         const element = document.getElementById('Resume');
        if(element){
       element?.click();
      console.log('attempting to click position play card');
      }
    } else if(keypress.keyID == 36){

        const element = document.getElementById('Exit');
        if(element){
         element?.click();
        // console.log('attempting to click position  play card');
      };
    }
  }

    return () => {
        events.close();
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[controller, controller.status, controller.pianoMode,status])
  
  return (
    <div>
      <h1 className='sticky-header'>
        Pause Menu
      </h1>

    <div className='pause-select'>
      <MenuButton
        title='Resume'
        icon={faPlay}
        text=''
        action={unpause} 
        keyID={26}
        colorID={2} />

      <MenuButton
        title='Exit'
        icon={faX}
        text=''
        action={exitToModeSelect}
        keyID={36}
        colorID={3} />

      </div>
    </div>
  );
}



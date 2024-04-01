import ModeCard from './ModeCard';
import {faGamepad, faChalkboardTeacher, faBullseye, faMagicWandSparkles, faWrench } from '@fortawesome/free-solid-svg-icons';
import "./index.css"
import PlayPianoController from '../../pianoStateController/PlayPianoController';
import { Settings } from '../PlayPianoMenus/Settings';
import { PPPATH, usePlayPianoController } from '../../App';
import MenuButton from '../PlayPianoMenus/button';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import useKeyPressesFromServer from '../utils/lastKeyPressAPIHook';

//move to the page for modes, buttons select the mode function buttonAction = {}=>

// eslint-disable-next-line react-hooks/rules-of-hooks


function ModeSelect() {

  const nav = useNavigate();

  const lastKeyPress = useKeyPressesFromServer();
  return (
    <div className="mode-select">
      <ModeCard
                mode= 'Learn'
                icon={faChalkboardTeacher}
                text="Learn to play the piano"
                keyID={1}
                />

      <ModeCard 
        mode='Play'
        icon={faGamepad}
        text='Play along, and go for a high score' keyID={2}                />

      <ModeCard 
        mode="Free"
        icon={faBullseye}
        text='Free play mode' keyID={3}                 />

      <ModeCard
        mode="Magic"
        icon={faMagicWandSparkles}
        text='Select song, and watch the piano magically playing itself' 
        keyID={4}               />

      
      <MenuButton title={'Settings'} icon={faWrench} text={'Change Play Piano Settings'} action={()=> nav(PPPATH.SETTINGS)} />    
    </div>
  );
}


export default ModeSelect;

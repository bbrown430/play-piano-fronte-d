import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import PlayPianoController, { PianoMode } from '../../pianoStateController/PlayPianoController';
import { useNavigate } from "react-router-dom";
import { assert } from 'console';
import { PPPATH, usePlayPianoController } from '../../App';
import { useActionOnKeyPress } from '../utils/lastKeyPressAPIHook';

const colors = [[255,0,0],[0,255,0],[0,0,255],[255,255,0],[255,0,255],[0,255,255]];

type Statefunction = () => void;
interface ModeCardProps {
  action? : Statefunction;
  mode? : PianoMode;
  icon? : IconDefinition;
  text? : string ;
  link? : string;
  keyID : number;
}


/**
 * 
 * @param controller @type {PlayPianoController} to display into for
 * @returns 
 */
function ModeCard({ mode, icon, text, link, keyID} : ModeCardProps) : JSX.Element {

  const controller = usePlayPianoController();

  link = link ? link : PPPATH.SONGSELECT
  mode = mode ? mode : 'Free'
  icon = icon ? icon : faQuestion;
  text = text ? text : "";

  controller.setKeyColor({keyID: keyID, color :colors[keyID]});

  const nav = useNavigate();

  const pressAction = () => {
  if(mode)
   controller.pianoMode = mode;
   //link to song select page
    if(link){
    nav(link);
    };
  } 
  useActionOnKeyPress(pressAction,keyID);

  return (
    <div className = "mode-card" onClick = {pressAction}>

      <FontAwesomeIcon icon = {icon} className = "mode-icon" />

      <h1>{mode}</h1>

      <p>{text}</p>

    </div>
  );
}

export default ModeCard;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import PlayPianoController from '../../pianoStateController/PlayPianoController';
import { PianoMode } from '../utils/types';
import { useNavigate } from "react-router-dom";
import { PPPATH, usePlayPianoController } from '../../App';
import { useActionOnKeyPress } from '../utils/APIHooks';

type color = [number,number,number];
export const ButtonColors : color[] = [[200,0,0],[0,200,0],[0,0,200],[200,200,0],[200,0,200],[0,200,200]];
export const ButtonOffset = 30;
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
function ModeCard({ action, mode, icon, text, link, keyID} : ModeCardProps) : JSX.Element {

  const controller : PlayPianoController = usePlayPianoController();

  link = link ? link : PPPATH.SONGSELECT
  mode = mode ? mode : 'Free'
  icon = icon ? icon : faQuestion;
  text = text ? text : "";
  

  controller.setKeyColor(keyID+ ButtonOffset, ButtonColors[keyID]);

  const nav = useNavigate();

  const pressAction = () => {
  if(mode)
   controller.pianoMode = mode;
   //link to song select page
    if(link){
    nav(link);
    };
  } 

  action = action !== undefined ? action : pressAction 

  useActionOnKeyPress(action,keyID+ButtonOffset);

  return (
    <div className = "mode-card" 
    style={{backgroundColor:`rgba(${ButtonColors[keyID]},1)` }}
    onClick = {action}>
      <FontAwesomeIcon icon = {icon} className = "mode-icon" />
      <h1>{mode}</h1>
      <p>{text}</p>
    </div>
  );
}

export default ModeCard;

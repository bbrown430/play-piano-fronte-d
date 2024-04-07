import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import PlayPianoController from '../../pianoStateController/PlayPianoController';
import { PianoMode } from '../utils/types';
import { useNavigate } from "react-router-dom";
import { PPPATH, usePlayPianoController } from '../../App';
import { ButtonColors } from '../utils/types';

type Statefunction = () => void;
interface ModeCardProps {
  action? : Statefunction;
  mode? : PianoMode;
  icon? : IconDefinition;
  text? : string ;
  link? : string;
  colorID? : number
  keyID? : number;
}


/**
 * 
 * @param controller @type {PlayPianoController} to display into for
 * @returns 
 */
function ModeCard({ colorID,action, mode, icon, text, link} : ModeCardProps) : JSX.Element {

  const controller : PlayPianoController = usePlayPianoController();

  link = link ? link : PPPATH.SONGSELECT
  mode = mode ? mode : 'Free'
  icon = icon ? icon : faQuestion;
  text = text ? text : "";
  

  const nav = useNavigate();

  const pressAction = async () => {
  if(mode)
    await controller.setPianoMode(mode);
   // await controller.setStatus('Waiting');
    if(link){
    nav(link);
    };
  } 

  action ||= pressAction 

  return (
    <div className = "mode-card" 
    id={`${mode}`}
    style={{backgroundColor:`rgba(${ButtonColors[colorID||0]},1)` }}
    onClick = {action}>
      <FontAwesomeIcon icon = {icon} className = "mode-icon" />
      <h2 className="mode-header">{mode}</h2>
      <p>{text}</p>
    </div>
  );
}

export default ModeCard;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import { useActionOnKeyPress } from '../utils/APIHooks';
import { ButtonColors } from '../utils/types';
import PlayPianoController from '../../pianoStateController/PlayPianoController';
import { usePlayPianoController } from '../../App';


interface MenuButtonProps {
  title: string | undefined;
  icon: IconDefinition | undefined;
  text: string | undefined;
  action: ()=>any | undefined;
  keyID: number;
  colorID?: number;
}


function MenuButton( {colorID, title, icon, text, action,keyID} : MenuButtonProps) : JSX.Element {

  // for testing 
  const controller : PlayPianoController = usePlayPianoController();

  title = title ? title : "";
  icon = icon ? icon : faQuestion;
  text = text ? text : "";
  
  useActionOnKeyPress(action,keyID,colorID||0)

  return (
    <div className="pause-card"
    style={{backgroundColor:`rgba(${ButtonColors[colorID||0]},.9)` }}
     onClick={()=>{if (action){action()}}}>
      <FontAwesomeIcon icon={icon}  className="mode-icon" />
      <h2>{title}</h2>
      <p>{text}
      </p>
    </div>
  );
}

export default MenuButton;

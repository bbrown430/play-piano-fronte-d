import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import { useActionOnKeyPress } from '../utils/lastKeyPressAPIHook';
import { ButtonColors } from '../ModePage/ModeCard';
import PlayPianoController from '../../pianoStateController/PlayPianoController';
import { usePlayPianoController } from '../../App';


interface MenuButtonProps {
  title: string | undefined;
  icon: IconDefinition | undefined;
  text: string | undefined;
  action: ()=>void | undefined;
  keyID: number;
}


function MenuButton( {title, icon, text, action,keyID} : MenuButtonProps) : JSX.Element {

  // for testing 
  const controller : PlayPianoController = usePlayPianoController();

  title = title ? title : "";
  icon = icon ? icon : faQuestion;
  text = text ? text : "";
  
  useActionOnKeyPress(action,keyID)
  controller.setKeyColor(keyID, ButtonColors[keyID]);

  return (
    <div className="menu-button"
    style={{backgroundColor:`rgba(${ButtonColors[keyID]},.9)` }}
     onClick={()=>{if (action){action()}}}>
      <FontAwesomeIcon icon={icon}  className="mode-icon" />
      <h1 style={{fontSize:`2em`}}>{title}</h1>
      <p>
        {text}
      </p>
    </div>
  );
}

export default MenuButton;

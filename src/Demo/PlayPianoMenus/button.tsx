import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import { useActionOnKeyPress } from '../utils/lastKeyPressAPIHook';
import { ButtonColors } from '../ModePage/ModeCard';


interface MenuButtonProps {
  title: string | undefined;
  icon: IconDefinition | undefined;
  text: string | undefined;
  action: ()=>void | undefined;
  keyID: number;
}


function MenuButton( {title, icon, text, action,keyID} : MenuButtonProps) : JSX.Element {

  // for testing 

  action = action === undefined ?  ()=>{} : action;
  title = title ? title : "Untitled";
  icon = icon ? icon : faQuestion;
  text = text ? text : "placeholder text for a play piano menu button";
  
  useActionOnKeyPress(action,keyID)

  return (
    <div className="menu-button"
    style={{backgroundColor:`rgb(${ButtonColors[keyID]})` }}
     onClick={()=>{if (action){action()}}}>
      <FontAwesomeIcon icon={icon}  className="mode-icon" />
      <h1>{title}</h1>
      <p>
        {text}
      </p>
    </div>
  );
}

export default MenuButton;

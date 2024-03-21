import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import { ReactComponentElement, ReactNode } from 'react';
import PlayPianoController from '../../pianoStateController/PlayPianoController';

type Statefunction = () => void;

interface MenuButtonProps {
  title: string | undefined;
  icon: IconDefinition | undefined;
  text: string | undefined;
  action: Statefunction | undefined;
}


function MenuButton( {title, icon, text, action} : MenuButtonProps) : JSX.Element {
  
  // for testing 

  action = action ? action : ()=>{};
  title = title ? title : "Untitled";
  icon = icon ? icon : faQuestion;
  text = text ? text : "placeholder text for a play piano menu button";

  return (
    <div className="menu-button" onClick={()=>{if (action){action()}}}>
      <FontAwesomeIcon icon={icon}  className="mode-icon" />
      <h1>{title}</h1>
      <p>
        {text}
      </p>
    </div>
  );
}

export default MenuButton;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import { Link, Navigate } from "react-router-dom"
import { ReactComponentElement, ReactNode } from 'react';
import PlayPianoController, { PianoMode } from '../../pianoStateController/PlayPianoController';
import { useNavigate } from "react-router-dom";
import { assert } from 'console';
import { PPPATH, usePlayPianoController } from '../../App';


type Statefunction = () => void;
interface ModeCardProps {
  action? : Statefunction;

  mode? : PianoMode;
  icon? : IconDefinition;
  text? : string ;
  link? : string;
}


/**
 * 
 * @param controller @type {PlayPianoController} to display into for
 * @returns 
 */
function ModeCard({ mode, icon, text, link} : ModeCardProps) : JSX.Element {

  const controller = usePlayPianoController();
  // for testing 

  link = link ? link : PPPATH.SONGSELECT
  mode = mode ? mode : 'Free'
  icon = icon ? icon : faQuestion;
  text = text ? text : "placeholder text for a play piano menu button";

  const nav = useNavigate();
  const pressCard = () => {
  //change piano mode
   controller.pianoMode = mode;

   //link to song select page
    if(link){
    nav(link);
    };
  } 

  return (
    <div className="mode-card"
         onClick = {pressCard}>
    <FontAwesomeIcon icon = {icon} className="mode-icon" />
      <h1>{mode}</h1>
      <p>{text}</p>
    </div>
  );
}

export default ModeCard;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {faQuestion } from '@fortawesome/free-solid-svg-icons';

import "./index.css"
import "../../App.css"
import { Link } from "react-router-dom"
import { ReactComponentElement, ReactNode } from 'react';
import PlayPianoController from '../../pianoStateController/PlayPianoController';


interface ModeCardProps {
  controller: PlayPianoController
  title: string | undefined;
  icon: IconDefinition | undefined;
  text: string | undefined;
  link: string | undefined;
}


function ModeCard({controller, title, icon, text, link} : ModeCardProps) : JSX.Element {
  // for testing 

  link = link ? link : "../SongSelect";
  title = title ? title : "Untitled";
  icon = icon ? icon : faQuestion;
  text = text ? text : "placeholder text for a play piano menu button";

  return (
    <div className="mode-card">
      <Link to={link}>
        <FontAwesomeIcon icon={icon} className="mode-icon" />
      </Link>
      <h1>{title}</h1>
      <p>
        {text}
      </p>
    </div>
  );
}

export default ModeCard;

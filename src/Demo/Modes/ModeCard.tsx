import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import "./index.css"
import "../../App.css"
import { Link } from "react-router-dom"


interface ModeCardProps {
  title: string;
  icon: IconDefinition;
  text: string
  link: string;
}

function ModeCard({ title, icon,text,link }: ModeCardProps) {
  // for testing 
  link = "../SongSelect";
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

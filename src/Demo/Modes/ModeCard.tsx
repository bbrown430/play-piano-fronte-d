import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import "./index.css"
import { Link } from "react-router-dom"


interface ModeCardProps {
  title: string;
  icon: IconDefinition;
}

function ModeCard({ title, icon }: ModeCardProps) {
  return (
    <div className="mode-card">
      <Link to={"../SongSelect"}>
        <FontAwesomeIcon icon={icon} className="mode-icon" />
      </Link>
      <h1>{title}</h1>
      <p>
        This is filler text! Here is more! This is even more filler!
      </p>
    </div>
  );
}

export default ModeCard;

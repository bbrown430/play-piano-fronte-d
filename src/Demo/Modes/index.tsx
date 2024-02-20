import ModeCard from './ModeCard';
import {faGamepad, faChalkboardTeacher, faBullseye, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import "./index.css"

function ModeSelect() {
  return (
    <div className="mode-select">
      <ModeCard title="Learn" icon={faChalkboardTeacher} />
      <ModeCard title="Play" icon={faGamepad} />
      <ModeCard title="Free" icon={faBullseye} />
      <ModeCard title="Magic" icon={faMagicWandSparkles} />
    </div>
  );
}

export default ModeSelect;

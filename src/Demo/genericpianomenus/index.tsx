import "./index.css"
import PlayPianoController from '../../pianoStateController/PlayPianoController';
import { PauseMenu } from './PauseMenu';

export interface MenuProps{
  controller: PlayPianoController;
}

export function Debug({controller} : MenuProps){
  return (
    <div className="menu-wrapper">
      <title>debug</title>
      <ol>
        <li>{`current game state information`}</li>
        <li>{`${controller.mode}`}</li>
        <li>{`${controller.status}`}</li>
        <li>{`${controller.settings.pianoSound}`}</li>
        <li>{`song = ${controller.songSettings.song} tempo = ${controller.songSettings.tempo}`}</li>

        


      </ol>
              

    </div>
  );


}


export default PauseMenu;

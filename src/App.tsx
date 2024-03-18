import './App.css';
import SplashScreen from "./Demo/SplashScreen";
import ModeSelect from './Demo/Modes';
import SongSelect from './Demo/Songs';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import { Debug } from './Demo/genericpianomenus';
import {PauseMenu} from './Demo/genericpianomenus/PauseMenu';
import PlayPianoController from './pianoStateController/PlayPianoController';

function App() {
  let controller = new PlayPianoController();

  return (
    <HashRouter>
      <div className="centered">
        <Routes>
          <Route path="/"             element={<SplashScreen/>}></Route>
          <Route path='/ModeSelect/*'   element={<ModeSelect controller={controller}/>}></Route>
          <Route path='/Paused/*' element={<PauseMenu controller={controller}/>}></Route>
          <Route path='/SongSelect/*'   element={<SongSelect/>}></Route>
          <Route path='/debug/*'   element={<Debug controller = {controller}/>}></Route>

        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
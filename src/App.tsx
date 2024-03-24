import './App.css';
import SplashScreen from "./Demo/SplashScreen";
import ModeSelect from './Demo/ModePage';
import SongSelect from './Demo/SongPage';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import { Debug } from './Demo/PlayPianoMenus/Debug';
import {PauseMenu} from './Demo/PlayPianoMenus/PauseMenu';
import PlayPianoController from './pianoStateController/PlayPianoController';
import { Settings } from './Demo/PlayPianoMenus/Settings';
import React, { useContext } from 'react';
import PlayPage from './Demo/PlayPage';

export  function usePlayPianoController(): PlayPianoController {

  const ctx = useContext(controllerContext);
  return ctx;
}

export const controllerContext = React.createContext<PlayPianoController>(new PlayPianoController());

export enum PPPATH {
  SPLASHSCREEN = '/',
  MODESELECT = '/ModeSelect',
  PAUSED = '/Paused',
  SONGSELECT = '/SongSelect',
  DEBUG = '/debug',
  PLAY = '/Play',
  SETTINGS = '/Settings',
}

function App() {

  return (
    <HashRouter>
      <div className="centered">
        <Routes>
          <Route path = {PPPATH.SPLASHSCREEN}          element={<SplashScreen/>}></Route>
          <Route path = {PPPATH.MODESELECT}   element={<ModeSelect/>}></Route>
          <Route path = {PPPATH.PAUSED} element={<PauseMenu/>}></Route>
          <Route path = {PPPATH.SONGSELECT}   element={<SongSelect/>}></Route>
          <Route path = {PPPATH.SETTINGS} element={<Settings/>}></Route>
          <Route path = {PPPATH.PLAY} element = {<PlayPage></PlayPage>}/>
          <Route path = {PPPATH.DEBUG}   element={<Debug/>}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;

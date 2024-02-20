import './App.css';
import SplashScreen from "./Demo/SplashScreen"
import ModeSelect from './Demo/Modes';
import SongSelect from './Demo/Songs'
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';

function App() {

  return (
    <HashRouter>
      <div className="centered">
        <Routes>
          <Route path="/"             element={<SplashScreen/>}></Route>
          <Route path='/ModeSelect/*'   element={<ModeSelect/>}></Route>
          <Route path='/SongSelect/*'   element={<SongSelect/>}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
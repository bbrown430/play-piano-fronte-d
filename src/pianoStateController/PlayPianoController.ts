 type Mode = 'Learn' | 'Play' | 'Free' | 'Magic' | undefined;
 type Status = 'Paused' | 'inProgress' | 'Over' | undefined;
 type PianoSound = 'Grand' | 'Digital' | 'Organ' | undefined;

 interface  PianoSettings{
  pianoSound : PianoSound
  //menu sound
  // background music?
  //toggle : boolean
  
}


 type SongSettings = {
  song : string;
  tempo : number; //percentage 
  //hands : 'left' | 'right' | 'both';
}

export type State = {
  mode : Mode;
  status : Status;
  settings : PianoSettings;
  songSettings : SongSettings;

}

export default class PlayPianoController {
  private _state : State;

constructor(){
  this._state = {mode: undefined,
                 settings:{pianoSound : 'Grand'},
                 songSettings : {song : '???????', tempo : 100},
                 status: undefined,
                }

}


  //gets the current 
  get mode() : Mode {
    return this._state.mode;
  }

  set mode(mode : Mode) {
    this._state.mode = mode;
  } 

  resetMode(){
    this._state.mode = undefined;
  }

  get settings() : PianoSettings {
    return this._state.settings;
  }

  set settings(settings : PianoSettings) {
    this._state.settings = settings;
  }

  get status() : Status{
    return this._state.status;
  }

  set status(status : Status) {
    this._state.status = status;
  }

  get songSettings() : SongSettings {
    return this._state.songSettings;
  }

  set songSettings(songSettings : SongSettings) {
    this._state.songSettings=songSettings;
  }



  // state to json or w/e to send to backend;

 
}
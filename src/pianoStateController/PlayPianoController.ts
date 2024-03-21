import { PlayPianoEventHandler, PianoEventMap } from './PlayPianoEventHandler';

 export type PianoMode = 'Learn' | 'Play' | 'Free' | 'Magic' | undefined;
 export type PianoState = 'Menus' | 'Paused' | 'inProgress' | 'Over' | undefined;

 export type PianoSound = 'Grand' | 'Digital' | 'Organ';





 

 export interface  PianoSettings{
  pianoSound : PianoSound
  // menu sound
  // background music?
  // toggle : boolean
  
}


 export type SongSettings = {
  song : string;
  tempo : number; //percentage 
  //hands : 'left' | 'right' | 'both';
}

export type State = {
  mode : PianoMode;
  status : PianoState;
  settings : PianoSettings;
  songSettings : SongSettings;

}

export default class PlayPianoController{
  private eventHandler : PlayPianoEventHandler;
  private _state : State;
  constructor(){
    this.eventHandler = new PlayPianoEventHandler()
    this._state = {mode: undefined,
                   settings:{pianoSound : 'Grand'},
                   songSettings : {song : '???????', tempo : 100},
                   status: undefined,
                  }
  
  }

  /**
   * returns the current piano sound mode.
   * @returns 
   */
  get pianoSound() : PianoSound {
    return this._state.settings.pianoSound;
  }
  set pianoSound(pianoSound : PianoSound){
    this._state.settings.pianoSound = pianoSound;
  }
  //gets the current 
  changeSoundMode() {
    switch(this._state.settings.pianoSound){
      case 'Digital' :
        this._state.settings.pianoSound='Organ'
        break;
      case 'Organ' :
        this._state.settings.pianoSound='Grand'
        break;
      case 'Grand' :
        this._state.settings.pianoSound='Digital'
        break;

      }
    //emit that change
  }
  unPause() {
    throw new Error('Method not implemented.');
  }

  restartSong() {
    throw new Error('Method not implemented.');
  }



  //gets the current 
  get mode() : PianoMode {
    return this._state.mode;
  }

  set mode(mode : PianoMode) {
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

  get status() : PianoState{
    return this._state.status;
  }

  set status(status : PianoState) {
    this._state.status = status;
  }

  get songSettings() : SongSettings {
    return this._state.songSettings;
  }

  set songSettings(songSettings : SongSettings) {
    this._state.songSettings = songSettings;
  }


  public addListener<E extends keyof PianoEventMap>(
    event: E,
    listener: PianoEventMap[E],
  ): this {
    this.eventHandler.addListener(event,listener);
    return this;
  }

  public removeListener<E extends keyof PianoEventMap>(
    event: E,
    listener: PianoEventMap[E],
  ): this {
    this.eventHandler.removeListener(event,listener);
    return this;
  }

  public emit<E extends keyof PianoEventMap>(
    event: E,
    ...args: Parameters<PianoEventMap[E]>
  ): boolean {
    return this.eventHandler.emit(event,...args);
  }
  
  



  // state to json or w/e to send to backend;


 
}
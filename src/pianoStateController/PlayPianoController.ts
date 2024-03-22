import { title } from 'process';
import { PlayPianoEventHandler, PianoEventMap } from './PlayPianoEventHandler';

 export type PianoMode = 'Learn' | 'Play' | 'Free' | 'Magic' | undefined;
 export type PianoState = 'Menus' | 'Paused' | 'inProgress' | 'Over';

 export type PianoSound = 'Grand' | 'Digital' | 'Organ';





 

 export interface  PianoSettings{
  pianoSound : PianoSound
  // menu sound
  // background music?
  // toggle : boolean
  
}


 export type SongSettings = {
  title : string;
 // tempo : number; //percentage 
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
                   songSettings : {title : '???????'},
                   status: 'Menus',
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
    console.log('sound change called');
    this.emit('soundChange',this.pianoSound);
  }

  //gets the current 
  changeSoundMode() {
    switch(this._state.settings.pianoSound){
      case 'Digital' :
        this.pianoSound = 'Organ'
        break;
      case 'Organ' :
        this.pianoSound = 'Grand'
        break;
      case 'Grand' :
        this.pianoSound = 'Digital'
        break;

      }
  }



  //gets the current 
  get pianoMode() : PianoMode {
    return this._state.mode;
  }

  set pianoMode(mode : PianoMode) {
    if(this.pianoMode !== mode){
    this._state.mode = mode;
    this.emit('pianoModeChange',this.pianoMode);}
  } 

  resetMode(){
    this.pianoMode = undefined;
  }


  get status() : PianoState{
    return this._state.status;
  }

  set status(status : PianoState) {
    this._state.status = status;
  }


  isPaused() : boolean 
  {
    return this._state.status === 'Paused';

  }
  unPause() {
    if(this.isPaused()){
      this._state.status = 'inProgress';
    }
  }

    /**
   * returns the current piano sound mode.
   * @returns 
   */
    get songTitle() : string {
      return this._state.songSettings.title;
    }

    set songTitle(title : string) {

      if(this.songTitle===title){
        return;
      } 
      this.emit('songChange', this.songTitle)
      this._state.songSettings.title = title;
      
    }


  
  async startSong() : Promise<boolean>{
    return true;
    //throw new Error("Method not implemented.");
  }

    
  

  async restartSong() : Promise<boolean> {
    return true;
    //todo await send song to play to dev
    throw new Error('Method not implemented.');
  }












  // needed to use listener from outside this class
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

  private emit<E extends keyof PianoEventMap>(
    event: E,
    ...args: Parameters<PianoEventMap[E]>
  ): boolean {
    console.log(`${this._state}`)
    return this.eventHandler.emit(event,...args);
  }
  
  



  // state to json or w/e to send to backend;


 
}
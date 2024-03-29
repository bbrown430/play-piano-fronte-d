import { title } from 'process';
import { PlayPianoEventHandler, PianoEventMap } from './PlayPianoEventHandler';
import { PlayPianoHttp } from '../HttpAPI/PlayPianoHttp';

 export type PianoMode = 'Learn' | 'Play' | 'Free' | 'Magic';
 export type PianoState = 'Menus' | 'Paused' | 'inProgress' | 'Over';

 export type PianoSound = 'Grand' | 'Digital' | 'Organ';

 const FlaskEndPoint = '';





 

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
  private httpcontroller! : PlayPianoHttp;
  private eventHandler : PlayPianoEventHandler;
  private _state : State;
  constructor(){
    this.httpcontroller=new PlayPianoHttp(FlaskEndPoint)




    this.eventHandler = new PlayPianoEventHandler()
    this._state = { mode : 'Free',
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

   set  pianoSound(pianoSound : PianoSound){

    if(pianoSound !== this._state.settings.pianoSound){
    this._state.settings.pianoSound = pianoSound;
    this.httpcontroller.setSoundSetting(pianoSound);
    this.emit('soundChange',this.pianoSound);}

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
    this.httpcontroller.setMode(mode);
    this.emit('pianoModeChange',this.pianoMode);}
  } 


  get status() : PianoState{
    return this._state.status;
  }

  set status(status : PianoState) {
    if (status === this.status){
      return;
    }
    this._state.status = status;
    this.httpcontroller.setStatus(status);
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
      this.httpcontroller.setSong(title);
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
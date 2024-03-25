import { assert, error } from 'console';
import { PlayPianoEventHandler, PianoEventMap, PPEvents } from './PlayPianoEventHandler';
import { sleep } from './utils';

 export type PianoMode = 'Learn' | 'Play' | 'Free' | 'Magic' | undefined;
 export type PianoState = 'Menus' |'Waiting' | 'Paused' | 'inProgress' | 'Over';

 export type PianoSound = 'Grand' | 'Digital' | 'Organ';






 

 export interface  PianoSettings{
  pianoSound : PianoSound
  // menu sound
  // background music?
  // toggle : boolean
  
}


export interface SongState {
  title? : string;
 // tempo : number; //percentage 
  progress?: number
  end?: number;
}

export type State = {
  mode? : PianoMode;
  status : PianoState;
  settings : PianoSettings;
  currentSongState : SongState;

}

export default class PlayPianoController{
  private eventHandler : PlayPianoEventHandler;
  private _state : State;
  constructor(){
    this.eventHandler = new PlayPianoEventHandler()
    this._state = {settings:{pianoSound : 'Grand'},
                   status: 'Menus',
                   currentSongState: {}
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
  get pianoMode() : PianoMode  {

    return this._state.mode;
  }

  set pianoMode(mode : PianoMode) {
    if(this.pianoMode !== mode){
    this._state.mode = mode;
    this.emit(PPEvents.MODE,mode);}
  } 



  get status() : PianoState{
    return this._state.status;
  }

  set status(status : PianoState) {
    this._state.status = status;
    this.emit(PPEvents.STATUS,status)
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
    get songTitle() : string | undefined{

      return this._state.currentSongState.title;
     
    }

    set currentSong( newSong : SongState) {

      this._state.currentSongState = newSong;
      
      this.emit(PPEvents.SONG, newSong);
      
    }
    get currentSong() : SongState {
      return this._state.currentSongState;
    }


  
   startSong() : boolean{

    this.status = 'inProgress'
    this.playCurrentSong();


    return true;
    //throw new Error("Method not implemented.");
  }

  private async playCurrentSong() {

    if(!this.currentSong.progress || !this.currentSong.end ){
      throw Error('song cannot be played before a song is selected.')
    }

    //simulate progress moving
    while (this.currentSong.progress < this.currentSong.end ) {
      if(this.status === 'Paused'){
       break;
        
      }
      // TODO use http get 
      await sleep(500);
      this.currentSong.progress++;
      this.emit(PPEvents.NOTEPLAYED,this.currentSong.progress)

    }

    return;
    
  }


    
  

  async restartSong() : Promise<boolean> {
    if(!this._state.currentSongState.progress){
      return false;
    }
    this._state.currentSongState.progress = 0
    this.status = 'Waiting';
    return true;
    
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
    return this.eventHandler.emit(event,...args);
  }
  
  



  // state to json or w/e to send to backend;


 
}

















import { assert, error } from 'console';
import { PlayPianoEventHandler, PianoEventMap, PPEvents } from './PlayPianoEventHandler';
import { sleep } from '../Demo/utils/utils';
import { PlayPianoHttp } from '../Server/PlayPianoHttp';
import { ButtonColors, PianoMode, PianoState, WhiteKeys } from '../Demo/utils/types';
import { PianoSound } from '../Demo/utils/types';
import { PlayPianoControllerState, SongState } from '../Demo/utils/types';

 const FlaskEndPoint = 'http://127.0.0.1:4000';






   
 const httpoff= true;

export default class PlayPianoController{
 
  public httpcontroller! : PlayPianoHttp;
  private eventHandler : PlayPianoEventHandler;
  private _state : PlayPianoControllerState;
  constructor(){
    this.httpcontroller=new PlayPianoHttp(FlaskEndPoint);
    this.eventHandler = new PlayPianoEventHandler();
    this._state = {
                   mode:'Free',
                   settings:{pianoSound : 'Grand'},
                   status: 'Menus',
                   currentSongState: {}
                  }
  }


  /**
   * sets key color using http request to device server
   * @param keyID 
   * @param color 
   */
  public setKeyColor(keyID : number, color : [number,number,number] ) {
    if(httpoff){
      return;
    }
    this.httpcontroller.registerkey(keyID)
    this.httpcontroller.setKeyColor(keyID,color)
  }

  /**
   * sends request to clear all key registrations and colors
   */
 async clearKeys() {
      await this.httpcontroller.registerkey(-1);
  }
  async registerAllKeys(){
    if(httpoff){
      return;
    }
    this.httpcontroller.registerkey(100)
    await WhiteKeys.forEach(async (val,index)=>{
      this.httpcontroller.setKeyColor(val,ButtonColors[index%6])
    })
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
  get pianoMode() : PianoMode  {

    return this._state.mode;
  }

  async setPianoMode(mode : PianoMode) {
    
    this._state.mode = mode;
    this.emit(PPEvents.MODE,mode);
   // await this.httpcontroller.setMode(mode);
  } 


  get status() : PianoState{
    return this._state.status;
  }

  async  setStatus(newStatus : PianoState) {
    if(this.status === 'Menus' && newStatus==='inProgress'){
      console.log('invalid state change menus => inprogress')
      throw new Error('invalid state change menus => inprogress')
    }
    this._state.status = newStatus;
    this.emit(PPEvents.STATUS,newStatus)
 //   await this.httpcontroller.setStatus(newStatus);
  }


  protected isPaused() : boolean 
  {
    return this._state.status === 'Paused'; 
  }

  unPause() {
    if(this.isPaused()){
       this.setStatus('inProgress');
    }
  }

    /**
   * returns the current piano sound mode.
   * @returns 
   */
    get songTitle() : string | undefined{

      return this._state.currentSongState.title;
     
    }

    async setCurrentSong( newSong : SongState) {
      this.currentSong.title = newSong.title || "no tittle"
      this.currentSong.artist = newSong.artist || "no artist"
      this.currentSong.boundingBoxes = newSong.boundingBoxes || [];
      this.currentSong.end =  newSong.end || 10000;
      this.currentSong.progress = 0;
      this.emit(PPEvents.SONG, newSong);
      if(newSong.midiPath){
        this.currentSong.midiPath = newSong.midiPath;
      await this.httpcontroller.setSong(newSong.midiPath);
      }

  
      
    }
    get currentSong() : SongState {
      return this._state.currentSongState;
    }


  
   startSong() {

    this.setStatus('inProgress');


    return;
  }






  //for testing
  public async testPlayCurrentSong() {

    if(undefined === this.currentSong.progress || undefined === this.currentSong.end ){
      console.log(`${this.currentSong.progress}`)
      throw Error('song cannot be played before a song is selected.')
    }

    //simulate progress moving
    while (this.currentSong.progress < this.currentSong.end ) {
      if(this.status !== 'inProgress'){
       break;
        
      }
      // TODO use http get 
      await sleep(1000);
      this.currentSong.progress++;
      this.emit(PPEvents.NOTEPLAYED,this.currentSong.progress)

    }

    return;
    
  }


    
  

  async restartSong() : Promise<boolean> {
    this._state.currentSongState.progress = 0
    this.setStatus('Waiting');
    await this.setCurrentSong( {...this.currentSong})
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
















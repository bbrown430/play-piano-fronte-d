
export enum INTERNALENDPOINTS {
    CLIENTSTATUS       = '/api/status',
    KEYPRESSEVENT      = '/api/lastkeypress/event',
    PROGRESSCHANGEEVENT= '/api/songprogress/event',
    LASTKEYPRESS       = '/api/lastkeypress', 
    SONGPROGRESS       = '/api/songprogress', 
    SONGEND            = '/api/status',
    SONGENDEVENT       = '/api/status/event',
    BASEURL            = ''
  }; 
  

export type BoundingBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type PianoMode = 'Learn' | 'Play' | 'Free' | 'Magic';

export function  isPianoMode(keyInput: string): keyInput is PianoMode {
  return ['Learn' , 'Play' , 'Free' , 'Magic'].includes(keyInput);
}

export type PianoState = 'Menus' | 'Waiting' | 'Paused' | 'inProgress' | 'Over';

export function  isPianoState(keyInput: string): keyInput is PianoState {
  return ['Menus' , 'Waiting' , 'Paused' , 'inProgress' , 'Over'].includes(keyInput);
}

export type PianoSound = 'Grand' | 'Digital' | 'Organ';

export interface PianoSettings {
  pianoSound: PianoSound;
}


export interface SongState {
  title?: string;
  // tempo : number; //percentage 
  progress?: number;
  end?: number;
  boundingBoxes?: BoundingBox[];
}

export type PlayPianoControllerState = {
  mode: PianoMode;
  status: PianoState;
  settings: PianoSettings;
  currentSongState: SongState;

};

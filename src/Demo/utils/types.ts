
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
  midiPath? : string;
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
type color = [number, number, number];
export const ButtonColors : color[] = [[200,68,90],[115,189,112],[100,152,215],[125,88,204],[200,0,200],[0,200,200]];
export const WhiteKeys: number[] = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36,38,40,41,43,45,47,48,50,52,53,55,57,59,60]
export const MIDDLE10KEYS = WhiteKeys.slice(13,24);

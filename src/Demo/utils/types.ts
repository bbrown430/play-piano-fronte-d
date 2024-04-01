
export type BoundingBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type PianoMode = 'Learn' | 'Play' | 'Free' | 'Magic';

export type PianoState = 'Menus' | 'Waiting' | 'Paused' | 'inProgress' | 'Over';

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


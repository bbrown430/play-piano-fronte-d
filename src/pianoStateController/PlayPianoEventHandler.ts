import _ from 'lodash';
import { EventMap } from 'typed-emitter';
import { PianoSound } from '../Demo/utils/types';
import { PianoMode, PianoState } from '../Demo/utils/types';


export type PianoEventMap = EventMap & {
  modeChange: (newMode: PianoMode) => void;
  stateChange: (newState: PianoState) => void;
  soundChange: (newSound: PianoSound) => void;
};




export enum PPEvents {
  STATUS = 'statusChange',
  MODE = 'modeChange',
  SOUND = 'soundChange',
  SONG = 'songChange',
  NOTEPLAYED = "notePlayed"
}
export class PlayPianoEventHandler {

  private _listeners: Map<keyof PianoEventMap, PianoEventMap[keyof PianoEventMap][]> = new Map();



  /**
   * Add a listener for an event emitted by this InteractableAreaController
   * @param event
   * @param listener
   * @returns
   */
  public addListener<E extends keyof PianoEventMap>(
    event: E,
    listener: PianoEventMap[E]
  ): this {
    const listeners = this._listeners.get(event) ?? [];
    listeners.push(listener);
    this._listeners.set(event, listeners);
    return this;
  }

  /**
   * Remove a listener for an event emitted by this InteractableAreaController
   * @param event
   * @param listener
   * @returns
   */
  public removeListener<E extends keyof PianoEventMap>(
    event: E,
    listener: PianoEventMap[E]
  ): this {
    const listeners = this._listeners.get(event) ?? [];
    _.remove(listeners, (l: PianoEventMap[E]) => l === listener);
    this._listeners.set(event, listeners);
    return this;
  }

  /**
   * Emit an event to all listeners for that event
   * @param event
   * @param args
   * @returns
   */
  public emit<E extends keyof PianoEventMap>(
    event: E,
    ...args: Parameters<PianoEventMap[E]>
  ): boolean {
    const listeners = this._listeners.get(event) ?? [];
    listeners.forEach((listener) => { listener(...args); });
    return true;
  }

}

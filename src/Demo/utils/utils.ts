import { useNavigate } from "react-router";
import { PPPATH, usePlayPianoController } from "../../App";
import PlayPianoController from "../../pianoStateController/PlayPianoController";
import { KEYID } from "../PlayPage";
import { useActionOnKeyPress } from "./APIHooks";
import { useEffect, useState } from "react";

/**
 * 
 * @param waitTime ms
 * @returns 
 */
export const sleep = async (waitTime: number) => new Promise(resolve => setTimeout(resolve, waitTime));


/**
 * hook that will set status to paused, and navigagte to the pause menu when the pause key is pressed
 * @param controller 
 */
export function usePause() {
    const controller = usePlayPianoController();
    const nav = useNavigate();
    const pause = () => {
        controller.status = 'Paused';
        nav(PPPATH.PAUSED);
    };



    useActionOnKeyPress(pause, KEYID.PAUSE);
}


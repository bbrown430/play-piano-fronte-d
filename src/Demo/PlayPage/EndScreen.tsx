import { PPPATH, usePlayPianoController } from "../../App";
import MenuButton from "../PlayPianoMenus/button";
import { faArrowRotateForward, faMusic, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export function EndScreen() {
    const controller = usePlayPianoController();
    const nav = useNavigate();

    const restart = () => {
        controller.restartSong();
        nav(PPPATH.PLAY);
    };

    const changeSong = async () => {
        await controller.setStatus('Menus');
        nav(PPPATH.SONGSELECT);
    };
    const exitToModeSelect = async () => {
        await controller.setStatus('Menus');
        nav(PPPATH.MODESELECT);
    };

    return (
        <div className="menu-wrapper">

            <div className='menu-header'>
                Paused
            </div>

            <div className="menu-row">

            </div>

            <div className="menu-row">
                <MenuButton
                    title='Restart'
                    icon={faArrowRotateForward}
                    text='restart current song from begining'
                    action={restart} keyID={29} 
                    colorID={0}/>

                <MenuButton
                    title='Change Song'
                    icon={faMusic}
                    text=''
                    action={changeSong} keyID={31}
                    colorID={1} />


                <MenuButton
                    title='Exit'
                    icon={faX}
                    text='End Song, Return to Menu'
                    action={exitToModeSelect} keyID={33}
                    colorID={2} />

            </div>

        </div>
    );



}

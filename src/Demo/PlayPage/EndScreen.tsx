/* eslint-disable eqeqeq */
import { PPPATH, usePlayPianoController } from "../../App";
import MenuButton from "../PlayPianoMenus/button";
import { faArrowRotateForward, faMusic, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { EVENTENDPOINT, KeyPress, useControllerMode, useScoreFromServer } from "../utils/APIHooks";
import { useEffect } from "react";
import { ButtonColors } from "../utils/types";

export function EndScreen() {
    const controller = usePlayPianoController();
    const nav = useNavigate();
    const score = useScoreFromServer();
    const mode = useControllerMode();

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

    useEffect( () => {


        const events = new EventSource(EVENTENDPOINT);
        const setupButtons = async ()=>{
            await controller.clearKeys();
            await controller.registerKey(28,ButtonColors[0])
           
            await controller.registerKey(31,ButtonColors[1])
            await controller.registerKey(35,ButtonColors[2])
    
          }
    
        setupButtons();
    
        events.onmessage = (event) => {
    
          const keypressed = JSON.parse(event.data);
          const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
          console.log(`Key pressed id : ${keypress.keyID} keys listening for 28 31 35`);
    
          if(keypress.keyID ===undefined){
            console.log(`returning keypress :  ${keypress}`)
            return;
          }
          //learn
          if(keypress.keyID == 28 ){
    
          const element = document.getElementById('Restart');
          if(element){
          element?.click();
          console.log('attempting to click position 3 card');
          }
        }//play
          else if(keypress.keyID == 31){
             const element = document.getElementById('Change Song');
            if(element){
           element?.click();
           console.log('attempting to click position  play card');
    
          }
        }else if(keypress.keyID == 35){
    
            const element = document.getElementById('Exit');
            if(element){
             element?.click();
             console.log('attempting to click position  play card');
          };
        }
      }
    
        return () => {
            events.close();
          }
    
      },[controller,controller.status])


    return (
        <div>
        <h1 className='sticky-header'>
         The End?
         </h1>

    <div className= "pause-select">
                {mode !== 'Free' ? <MenuButton
                    title='Restart'
                    icon={faArrowRotateForward}
                    text=''
                    action={restart} keyID={28} 
                    colorID={0}/>
                    : <></>}

                

                

                {mode !== 'Free' ? <MenuButton
                    title='Change Song'
                    icon={faMusic}
                    text=''
                    action={changeSong} keyID={31}
                    colorID={2} />
                    : <></>}

                <MenuButton
                    title='Exit'
                    icon={faX}
                    text=''
                    action={exitToModeSelect} keyID={35}
                    colorID={3} />

            </div>

        </div>
    );



}

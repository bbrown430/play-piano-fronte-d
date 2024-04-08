import { usePlayPianoController } from "../../App";
import { useEffect, useState } from "react";
import { BoundingBox } from '../utils/types';
import { EVENTENDPOINT, useProgressFromServer } from "../utils/APIHooks";
import logo from '../../assets/play-piano-logo.svg';
import { usePause } from "../utils/utils";

export function SheetMusic() {
    usePause();
    const [imgsrc, setImgSrc] = useState(undefined);
    const controller = usePlayPianoController();
    //@todo one day have a list of page breaks, and incriment when appropriate
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [pagenum, setPagenum] = useState(1);

    //const [boundingBox, setBoundingbox] = useState<BoundingBox | undefined>(undefined);
   // const [progress, setProgress ] = useState(0);

    /*
  useEffect( () => {
      const events = new EventSource(EVENTENDPOINT);

      events.onmessage = (event) => {

        const lastEvent = JSON.parse(event.data);
        const apiprogress : number = lastEvent.progress



        if(apiprogress < 0 || apiprogress === undefined){
          console.log(`returing before setting progress because :${lastEvent}  ${apiprogress}`)

          return;
        }
        console.log(`midi progress processed prev progress$  ${apiprogress}`);
        setProgress(prev=> prev + 1);


    }
    

    return () => {
      events.close();
      console.log('unmounting progress listener')
    }
  }, []);*/

    //updates bounding box coordinates 
    // and ends game if we reached the end of the song
  /*  useEffect(() => {

        if (controller.currentSong.boundingBoxes && controller.currentSong.boundingBoxes.length > progress) {
            setBoundingbox(controller.currentSong.boundingBoxes[progress]);
        }
        console.log(`${boundingBox?.x},${boundingBox?.y},${boundingBox?.width},${boundingBox?.height}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress]);*/


    useEffect(() => {
        let imgtemp;

        if (controller.currentSong && controller.currentSong.title) {
            const safeTitle = controller.currentSong.title.replace(/[?']/g, '');

            try {
                imgtemp = require(`../../assets/SheetMusic/${controller.currentSong.artist} - ${safeTitle}/data-${pagenum}.png`);
            } catch (error) {
                console.log(`Failed to load sheet music, displaying logo: ../../../public/data/${controller.currentSong.artist} - ${safeTitle}/data-${pagenum}.jpg`);
                imgtemp = logo;
            }

            setImgSrc(imgtemp);
        } else {
            console.log("Current song title is undefined.");
            // @todo @SymNC Handle the case when current song title is undefined
        }




        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controller.currentSong.title]);


    const getoffsets = () => {
        const element = document.getElementById("sheetimg");
        if (element) {
            const rect = element.getBoundingClientRect();
            return { top: rect.top, left: rect.left };
        }
        return { top: 200, left: 500 };
    };





    return (

        <div className="sheet-music">
            {controller.currentSong.title === undefined ? <></> : <img
                id="sheetimg"
                className="sheetimg"
                style={{ position: 'absolute' }}
                src={imgsrc}
                alt=""></img>}

            {/*{controller.status === 'inProgress' && controller.pianoMode === 'Learn' && boundingBox  ?
                <div className="note-overlay"
                    style={{
                        top: boundingBox.y + getoffsets().top,
                        left: boundingBox.x + getoffsets().left,
                        width: boundingBox.width,
                        height: boundingBox.height
                    }} />
                : <></>}*/}

        </div>
    );

                }
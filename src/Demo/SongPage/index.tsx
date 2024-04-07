/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
import metadata from '../../metadata.json';
import SongCard from './SongCard';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { useNavigate } from 'react-router';
import { PPPATH, usePlayPianoController } from '../../App';
import { EVENTENDPOINT, KeyPress, useActionOnKeyPress, useControllerStatus } from '../utils/APIHooks';
import { ButtonColors } from '../utils/types';

function SongSelect() {
    const [startIndex, setStartIndex] = useState(0);
    const controller = usePlayPianoController();
    const nav = useNavigate();

    const returnToModeSelect= async()=>{
        nav(PPPATH.MODESELECT)
    }

    // Function to get the circular array of 5 items
    const getCircularArray = (currentIndex: number, arrayLength: number) => {
        const result = [];
        for (let i = -2; i <= 2; i++) {
            const index = (currentIndex + i + arrayLength) % arrayLength;
            result.push(metadata[index]);
        }
        return result;
    };

    // Array of 5 items based on the current start index
    const currentArray = getCircularArray(startIndex, metadata.length);

    const selectCenterSong =  () => {
        const element = document.getElementById("position-3");
        if(element){
        element?.click();
        console.log('attempting to click position 3 card');
        }
        console.log('could not find position 3 card');

      }

      //scroll rigfhgt with right key
/*     
    const scrollRight = () => {
        setStartIndex((prevIndex) => (prevIndex === metadata.length - 1 ? 0 : prevIndex + 1));
    };
    const scrollLeft = () => {
        setStartIndex((prevIndex) => (prevIndex === 0 ? metadata.length - 1 : prevIndex - 1));
    }
    const scrollR =useActionOnKeyPress(scrollRight,35,2)

     const selectSong = useActionOnKeyPress(selectCenterSong,31,6);

      //scroll left with left key
    const scrollL = useActionOnKeyPress(scrollLeft,28,2) */

    

      

      //listen 3 piano keys
      useEffect( () => {
        const events = new EventSource(EVENTENDPOINT);

        controller.clearKeys();
        controller.setKeyColor(28,ButtonColors[0])
        controller.setKeyColor(35,ButtonColors[0])
        controller.setKeyColor(31,ButtonColors[1])
  
        events.onmessage = (event) => {
  
          const keypressed = JSON.parse(event.data);
          const keypress : KeyPress  = {keyID: keypressed.keyID, count : keypressed.count};
          console.log(`Key pressed id : ${keypress.keyID} keys listening for 28 35 31`);

          if(keypress.keyID ===undefined){
            console.log(`returning keypress :  ${keypress}`)
            return;
          }
          //go scroll left
          if(keypress.keyID == 28 ){
            console.log('dispatching leftKeyEvent')
            setStartIndex((prevIndex) => (prevIndex === 0 ? metadata.length - 1 : prevIndex - 1));
          }//go scroll right
          else if(keypress.keyID == 35){
            console.log('dispatching rightKeyEvent')
            setStartIndex((prevIndex) => (prevIndex === metadata.length - 1 ? 0 : prevIndex + 1))
          }else if(keypress.keyID == 31){
            selectCenterSong();
          };


    }

        return () => {
            events.close();
          }

      },[controller])
    // Event listener for arrow key presses
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                setStartIndex((prevIndex) => (prevIndex === 0 ? metadata.length - 1 : prevIndex - 1));
            } else if (event.key === 'ArrowRight') {
                setStartIndex((prevIndex) => (prevIndex === metadata.length - 1 ? 0 : prevIndex + 1));
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div>
            <h1 className='sticky-header'>Select Song</h1>
            <div className='song-select-container'>
                <div className='song-select'
                id='select'>
                    <FontAwesomeIcon icon={faChevronLeft} className="arrow" onClick={() => setStartIndex((prevIndex) => (prevIndex === 0 ? metadata.length - 1 : prevIndex - 1))} />
                    {currentArray.map((song, index) => (
                        <SongCard
                            key={index}
                            title={song.title}
                            artist={song.artist}
                            year={song.year}
                            image={song.image}
                            position={index + 1} // Increment index by 1 to match position numbering
                            genre={song.genre}
                            midi={song.midi}
                            difficulty={song.difficulty}
                        />
                    ))}
                    <FontAwesomeIcon icon={faChevronRight} className="arrow" onClick={() => setStartIndex((prevIndex) => (prevIndex === metadata.length - 1 ? 0 : prevIndex + 1))} />
                </div>
            </div>
        </div>
    );
}

export function SongPage() {
    return (
        <div className='song-page'>
            <SongSelect />
        </div>
    );
}

export default SongSelect;

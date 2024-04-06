import "./index.css";
import { PPPATH, usePlayPianoController } from "../../App";
import { useNavigate } from "react-router";
import { SongState } from '../utils/types';
import { getSongBoundingBoxes } from "../utils/songdata";
import { error } from "console";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useActionOnKeyPress } from "../utils/APIHooks";

interface SongCardProps {
    title: string;
    artist: string;
    year: number;
    image?: string;
    genre: string;
    position: number;
    midi: string;
}

function SongCard({ title, artist, year, image, position, genre, midi}: SongCardProps) {
    const nav = useNavigate();
    const controller = usePlayPianoController();


    const clicksong = async () => {
        if(position!==3){
            console.log('songselected, but not in first position')
            return;
        }
        const  bb = await getSongBoundingBoxes(title);
        await controller.setStatus('Waiting');
      
        const song: SongState = {
            midiPath: midi,
            title: title,
            progress: 0,
            end: bb.length,
            boundingBoxes : bb !== undefined ? bb : [],
        }
        controller.currentSong = song;
        
        nav(PPPATH.PLAY);
    }

    const positionClass = `position-${position}`;
    const hideMetadata = position === 1 || position === 5 || position === 2 || position === 4;


    return (
        <div 
        className={`song-card ${positionClass}`}
        onClick={clicksong}
        id={positionClass}
        >

            {!hideMetadata && <h3 className="song-metadata-title">{title}</h3>}
            {!hideMetadata && <h4 className="artist">{artist}</h4>}
            {!hideMetadata && <h5 className='year-genre'>{genre}, {year}</h5>}
            <img className='song-image' src={image} alt="" />
            {!hideMetadata && <h3 className="difficulty">Difficulty</h3>}
            {!hideMetadata && <div className="star-container">
                <FontAwesomeIcon icon={faStar} className="star"/>
                <FontAwesomeIcon icon={faStar} className="star"/>
                <FontAwesomeIcon icon={faStar} className="star"/>
                <FontAwesomeIcon icon={faStar} className="star-half"/>
                <FontAwesomeIcon icon={faStar} className="star-half"/>
            </div>}
        </div>
    )
}

export default SongCard;

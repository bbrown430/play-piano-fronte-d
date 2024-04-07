import "./index.css";
import { PPPATH, usePlayPianoController } from "../../App";
import { useNavigate } from "react-router";
import { SongState } from '../utils/types';
import { getSongBoundingBoxes } from "../utils/songdata";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { sleep } from "../utils/utils";

interface SongCardProps {
    title: string;
    artist: string;
    year: number;
    image?: string;
    genre: string;
    position: number;
    midi: string;
    difficulty: number;
}

function SongCard({ title, artist, year, image, position, genre, midi, difficulty}: SongCardProps) {
    const nav = useNavigate();
    const controller = usePlayPianoController();


    const clicksong = async () => {
        if(position!==3){
            console.log('songselected, but not in first position')
            return;
        }
        const  bb = await getSongBoundingBoxes(artist,title);
        const song: SongState = {
            artist:artist,
            midiPath: midi,
            title: title,
            progress: 0,
            end: bb.length,
            boundingBoxes : bb !== undefined ? bb : [],
        }
        await controller.setCurrentSong(song);
        await sleep(25);
        await controller.setStatus('Waiting');
        await sleep(25);
        
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
                {Array(difficulty).fill(<FontAwesomeIcon icon={faStar} className="star"/>)}
                {Array(5-difficulty).fill(<FontAwesomeIcon icon={faStar} className="star-half"/>)}
            </div>}
        </div>
    )
}

export default SongCard;

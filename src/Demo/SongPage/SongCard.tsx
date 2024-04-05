import "./index.css";
import { PPPATH, usePlayPianoController } from "../../App";
import { useNavigate } from "react-router";
import { SongState } from '../utils/types';
import { getSongBoundingBoxes } from "../utils/songdata";
import { error } from "console";

interface SongCardProps {
    title: string;
    artist: string;
    year: number;
    image?: string;
    position: number;
}

function SongCard({ title, artist, year, image, position }: SongCardProps) {
    const nav = useNavigate();
    const controller = usePlayPianoController();

    const clicksong = async () => {
        const  bb = await getSongBoundingBoxes(title);
      
        const song: SongState = {
            title: title,
            progress: 0,
            end: bb.length,
            boundingBoxes : bb !== undefined ? bb : [],
        }
        controller.currentSong = song;
        controller.status = 'Waiting';
        nav(PPPATH.PLAY)
    }

    const positionClass = `position-${position}`;
    const hideTitleArtist = position === 1 || position === 5;
    const hideYear = position === 1 || position === 5 || position === 2 || position === 4;


    return (
        <div className={`song-card ${positionClass}`} onClick={clicksong}>
            {!hideYear && <h3 className="song-metadata-title">{title}</h3>}
            {!hideYear && <h4 className="artist">{artist}</h4>}
            {!hideYear && <h5 className='year-genre'>{year}</h5>}
            <img className='song-image' src={image} alt="" />
        </div>
    )
}

export default SongCard;

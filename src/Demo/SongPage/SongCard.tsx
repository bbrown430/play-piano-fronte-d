import React from "react";
import "./index.css";
import { PPPATH, usePlayPianoController } from "../../App";
import { useNavigate } from "react-router";
import { SongState } from '../utils/types';
import { useActionOnKeyPress } from "../utils/APIHooks";

interface SongCardProps {
    title: string;
    artist: string;
    year: number;
    image: string;
    position: number;
}

function SongCard({ title, artist, year, image, position }: SongCardProps) {
    const nav = useNavigate();
    const controller = usePlayPianoController();

    const clicksong = () => {
        const song: SongState = {
            title: title,
            progress: 0,
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
            {!hideTitleArtist && <h3 className="song-metadata-title">{title}</h3>}
            {!hideTitleArtist && <h4 className="artist">{artist}</h4>}
            {!hideYear && <h5 className='year-genre'>{year}</h5>}
            <img className='song-image' src="https://upload.wikimedia.org/wikipedia/en/c/c3/Twilight_%28B%C3%B4a_album%29.jpg" alt="" />
        </div>
    )
}

export default SongCard;

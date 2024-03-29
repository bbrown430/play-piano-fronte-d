import internal from "stream";
import "./index.css"
import { PPPATH, usePlayPianoController } from "../../App";
import { useNavigate } from "react-router";
import { SongState } from "../../pianoStateController/PlayPianoController";

interface SongCardProps{
    title: string;
    artist: string;
    year: number;
    image: string;
}

function SongCard({title, artist, year, image}: SongCardProps) {
    const nav = useNavigate();
    const controller = usePlayPianoController();
    const clicksong = async () => {
        const song :SongState = {title : title}
        controller.currentSong = song;
        nav(PPPATH.PLAY)

    }
    return(
        <div className="song-card"
            onClick={clicksong}>
            <h1>{title}</h1>
            <h2>{artist}</h2>
            <h3>{year}</h3>
            <img src={image} alt="" />

        </div>
    )
}
export default SongCard
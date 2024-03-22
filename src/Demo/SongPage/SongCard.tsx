import internal from "stream";
import "./index.css"
import { PPPATH, usePlayPianoController } from "../../App";
import { useNavigate } from "react-router";

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
        controller.songTitle = title;
       const started =  await controller.startSong();
        if(started){ nav(PPPATH.PLAY)};

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
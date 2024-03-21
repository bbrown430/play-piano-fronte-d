import internal from "stream";
import "./index.css"
import { usePlayPianoController } from "../../App";

interface SongCardProps{
    title: string;
    artist: string;
    year: number;
    image: string;
}

function SongCard({title, artist, year, image}: SongCardProps) {
    const controller = usePlayPianoController();
    const clicksong = () => {
        controller.songTitle = title;

    

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
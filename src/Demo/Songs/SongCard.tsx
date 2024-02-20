import internal from "stream";
import "./index.css"

interface SongCardProps{
    title: string;
    artist: string;
    year: number;
    image: string;
}

function SongCard({title, artist, year, image}: SongCardProps) {
    return(
        <div className="song-card">
            <h1>{title}</h1>
            <h2>{artist}</h2>
            <h3>{year}</h3>
            <img src={image} alt="" />
        </div>
    )
}
export default SongCard
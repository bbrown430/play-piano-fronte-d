import metadata from '../../metadata.json';
import SongCard from './SongCard';
import "./index.css";

function SongSelect() {
    return (
        <div className='song-select'>
            {metadata.map((song, index) => (
                <SongCard
                    key={index}
                    title={song.title}
                    artist={song.artist}
                    year={song.year}
                    image={song.image}
                />
            ))}
        </div>
    );
}

function SongSelectControls() {
    return <></>
}

export function SongPage() {

    return (
        <div className='song-page'>
            {SongSelect()}
            {SongSelectControls()}
        </div>
    )
}

export default SongSelect;

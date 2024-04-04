import metadata from '../../metadata.json';
import SongCard from './SongCard';
import "./index.css";

function SongSelect() {
    return (

 <div className='song-screen'>
    <div className='song-header'>Select Song</div>

<div className='song-select-container'>
        <div className='song-select'>
            {metadata.slice((metadata.length/2)+1).map((song, index) => (
                <SongCard
                    key={index}
                    title={song.title}
                    artist={song.artist}
                    year={song.year}
                    image={song.image}
                />
            ))}
        </div>

        <div className='song-select'>
            {metadata.slice(0,metadata.length/2).map((song, index) => (
                <SongCard
                    key={index}
                    title={song.title}
                    artist={song.artist}
                    year={song.year}
                    image={song.image}
                />
            ))}
        </div>
        </div>

        </div>
        
    );
}


export function SongPage() {

    return (
        <div className='song-page'>
            {SongSelect()}
        </div>
    )
}

export default SongSelect;

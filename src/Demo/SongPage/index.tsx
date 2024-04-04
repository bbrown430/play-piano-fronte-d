import { useState, useEffect } from 'react';
import metadata from '../../metadata.json';
import SongCard from './SongCard';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

function SongSelect() {
    const [startIndex, setStartIndex] = useState(0);

    // Event listener for arrow key presses
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                setStartIndex((prevIndex) => (prevIndex === 0 ? metadata.length - 5 : prevIndex - 1));
            } else if (event.key === 'ArrowRight') {
                setStartIndex((prevIndex) => (prevIndex === metadata.length - 5 ? 0 : prevIndex + 1));
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div>
            <h1 className='sticky-header'>Select Song</h1>
            <div className='song-select-container'>
                <div className='song-select'>
                    <FontAwesomeIcon icon={faChevronLeft} className="arrow"/>
                    {metadata.slice(startIndex, startIndex + 5).map((song, index) => (
                        <SongCard
                            key={startIndex + index}
                            title={song.title}
                            artist={song.artist}
                            year={song.year}
                            image={song.image}
                            position={index + 1} // Increment index by 1 to match position numbering
                        />
                    ))}
                    <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                </div>
            </div>
        </div>
    );
}

export function SongPage() {
    return (
        <div className='song-page'>
            <SongSelect />
        </div>
    );
}

export default SongSelect;

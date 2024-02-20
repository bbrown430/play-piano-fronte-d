const fs = require('fs');
const path = require('path');

const songDirectory = path.join(__dirname, 'public', 'data');
const metadataFile = path.join(__dirname, 'public', 'metadata.json');

const metadata = fs.readdirSync(songDirectory).map(folder => {
    const folderPath = path.join(songDirectory, folder);
    const metadataPath = path.join(folderPath, 'metadata.json');
    const coverImagePath = `/songs/${folder}/cover.jpeg`;

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    return {
        title: metadata.title,
        artist: metadata.artist,
        year: parseInt(metadata.year), // Parse year as number
        image: coverImagePath
    };
});

fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

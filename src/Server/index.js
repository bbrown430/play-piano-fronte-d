import { emit } from 'process';
import '../pianoStateController/PlayPianoController';
import PlayPianoController from '../pianoStateController/PlayPianoController';

const EventEmitter = require('events');

let lastKeyPressed = {keyID : -1};

const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(express.static("build"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  console.log(`GET req made : ${req}`);
  res.send({test : 'Welcome to the PlayPiano Backend API!'});
});

app.put('/noteadvance',(req)=>{
  lastKeyPressed = req.body.keyID;
  console.log(`POST req made : ${req}`);
});

app.get('/noteadvance', (req, res) => {
  console.log(`GET req made : ${req}`);
  res.send(lastKeyPressed);
});






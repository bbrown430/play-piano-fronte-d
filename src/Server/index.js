
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

app.use(express.json());

//app.use(express.static("build"));

app.get('/status', (request, response) => response.json({clients: clients.length}));

let clients = [];
let lastKeyPressed = 
{
  keyID : -1,
  count : -1,
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/status', (request, response) => response.json({clients: clients.length}));


function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  //const data = `data: ${JSON.stringify(lastKeyPressed)}\n\n`;

  //response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

app.get('/api/events', eventsHandler);

app.get('/test', (req, res) => {
  console.log(`GET req made : ${req}`);
  res.send({test : 'Welcome to the PlayPiano Backend API!'});
});

function sendEventsToAll(payload) {
  clients.forEach(client => {
    const data = `data: ${JSON.stringify(payload)}\n\n`
    console.log(`sending ${data} to client`);
    client.response.write("event: message\n");
    client.response.write(data);
    //send(`data: ${data}\n\n`);
  });
}

//assumes sent {keyID:number}
app.post('/api/lastkeypress',  (req,res)=>{
  lastKeyPressed = {
    keyID : req.body.keyID, 
    count : lastKeyPressed.count + 1
  };
  console.log(`POST req made : ${req.body.keyID} ${lastKeyPressed.keyID}`);
  res.json(lastKeyPressed);
  return sendEventsToAll(lastKeyPressed);
});

app.get('/api/lastkeypress', (req, res) => {
  console.log(`GET req made seding :  ${lastKeyPressed}`);
  res.send(lastKeyPressed);
});




let status = {
  status : '',
} 
//send song ended event
app.post('api/status',  (req,res)=>{
  status = {
    keyID : req.body.status
  };
  console.log(`POST req made : ${req.body.status}`);
  res.json(status);
  return sendEventsToAll(status);
})

app.get('/api/status', (req, res) => {
  console.log(`GET req made seding :  ${status}`);
  res.send(status);
});



let progress = {
  progress : -1,
}
//assumes sent {keyID:number}
app.post('/api/progress',  (req,res)=>{
  progress = {
    progress : req.body.progress
  };
  console.log(`POST req made : ${req.body.progress}`);
  res.json(progress);
  return sendEventsToAll(progress);
});

app.get('/api/progress', (req, res) => {
  console.log(`GET req made seding :  ${progress}`);
  res.send(progress);
});

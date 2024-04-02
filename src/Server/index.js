const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8080;


const ENDPOINTS = Object.freeze({ 
  CLIENTSTATUS: '/api/status',
  KEYPRESSEVENT: '/api/lastkeypress/event',
  PROGRESSCHANGEEVENT: '/api/songprogress/event',
  LASTKEYPRESS: '/api/lastkeypress', 
  SONGPROGRESS: '/api/songprogress', 
  SONGEND: '/api/status',
  SONGENDEVENT: '/api/status/event'
}); 



const app = express();
app.use(cors());

app.use(express.json());

//app.use(express.static("build"));

app.get(ENDPOINTS.CLIENTSTATUS, (request, response) => response.json(
  {keyPressClients: keyPressClients.length,
   progressChangeClients: progressChangeClients.length

}));

//api state variables
let lastKeyPressed = 
{
  keyID : -1,
  count : -1,
};
let progress = {progress : 0};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//clientlistss for event listeners
let keyPressClients = [];
let progressChangeClients = [];


/**
 * KEYPRESS ENDPOINT CONFIG
 */
app.get(ENDPOINTS.KEYPRESSEVENT, EventsHandler(keyPressClients));

//assumes sent {keyID:number}
app.post(ENDPOINTS.LASTKEYPRESS,  (req,res)=>{
  lastKeyPressed = {
    keyID : req.body.keyID, 
    count : lastKeyPressed.count + 1
  };
  console.log(`POST req made : ${req.body.keyID} ${lastKeyPressed.keyID}`);
  res.json(lastKeyPressed);
  return sendEventsToAll(keyPressClients,lastKeyPressed);
});

app.get(ENDPOINTS.LASTKEYPRESS, (req, res) => {
  console.log(`GET req made seding :  ${lastKeyPressed}`);
  res.send(lastKeyPressed);
});






//PROGRESS ENDPOINT CONFIG
app.get(ENDPOINTS.PROGRESSCHANGEEVENT, EventsHandler(progressChangeClients));

app.post(ENDPOINTS.SONGPROGRESS,  (req,res)=>{
  progress += 1;
  console.log(`POST req made : ${req.body.progress}`);
  res.json(progress);
  return sendEventsToAll(progressChangeClients,progress);
});


//SONG END ENDPONT CONFIG
let songEndClients = []
app.get(ENDPOINTS.SONGENDEVENT, EventsHandler(progressChangeClients));

//send song ended event
app.post(ENDPOINTS.SONGEND,  (req,res)=>{
  console.log(`POST req made : ${req.body.progress}`);
  res.json(progress);
  return sendEventsToAll(songEndClients,progress);
})






/////////////////////HELPERS?????????????????????????
/**
 * Returns a middleware function that will add clients to the list specified when they subscribe.
 * 
 * @param {*} eventClientList list of clients to sent events to
 * @returns 
 */
function EventsHandler(eventClientList) {
  return(
  function keyPressEventsHandler(request, response, next) {
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

  eventClientList.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    keyPressClients = eventClientList.filter(client => client.id !== clientId);
  });
})
}


function sendEventsToAll(clientList,payload) {
  clientList.forEach(client => {
    const data = `data: ${JSON.stringify(payload)}\n\n`
    console.log(`sending ${data} to client`);
    client.response.write("event: message\n");
    client.response.write(data);
    //send(`data: ${data}\n\n`);
  });
}
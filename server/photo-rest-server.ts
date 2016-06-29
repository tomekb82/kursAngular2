import * as express from "express";
import * as path from "path";
//import * as ws from "ws";
import {Server as HttpServer} from 'http';
import {Server as WsServer} from 'ws';
import {Server as SubscriberServer} from 'ws';
import {Message} from './model/message';
import {Photo, Review, getPhotos, getPhotoById, getReviewsByPhotoId} from './model/photos';

const app = express();

/* Serve static resources: client angularjs app */
app.use('/',             express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

// HTTP Server
app.get('/', (req, res) => {
    //res.send('The URL for photos is http://localhost:8000/photos');
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.get('/photos', (req, res) => {
    res.json(getPhotos(req.query));
});
app.get('/photos/:id', (req, res) => {
    res.json(getPhotoById(parseInt(req.params.id)));
});
app.get('/photos/:id/reviews', (req, res) => {
  res.json(getReviewsByPhotoId(parseInt(req.params.id)));
});
const httpServer: HttpServer = app.listen(8000, "localhost", () => {
    const {address, port} = httpServer.address();
    console.log('HTTP Server is listening on %s', port);
});


// WebSocket Server
var wsSubcriberServer: SubscriberServer = new SubscriberServer({port:8085});
// Create the WebSocket server listening to the same port as HTTP server
const wsPhotoServer: WsServer = new WsServer({server: httpServer});

console.log('Subcriber WebSocket server is listening on 8085');
console.log('Photo WebSocket server is listening on 8080');

///////////////////////////////////////////////////////////////////////////
wsPhotoServer.on('connection', ws => {
  ws.on('message', message => {
    let subscriptionRequest = JSON.parse(message);
    subscribeToProductMessage(ws, subscriptionRequest.photoId);
  });
});

setInterval(() => {
  generateNewMessages();
  broadcastNewMessagesToSubscribers();
}, 2000);


// The map key is a reference to WebSocket connection that represents a user.
const subscriptions = new Map<any, number[]>();

function subscribeToProductMessage(client, photoId: number): void {
  let photos = subscriptions.get(client) || [];
  subscriptions.set(client, [...photos, photoId]);
}

// Message generator
const currentMessages = new Map<number, string>();

function generateNewMessages() {
  getPhotos().forEach(p => {
    const currentMessage = currentMessages.get(p.id);
    const newMessage = 'Hello' + Math.random(); 
    currentMessages.set(p.id, newMessage);
  });
}

function broadcastNewMessagesToSubscribers() {

  subscriptions.forEach((photos: number[], ws: WebSocket) => {
    if (ws.readyState === 1) { // 1 - READY_STATE_OPEN
      let newMessages = photos.map(pid => ({
        photoId: pid,
        message: currentMessages.get(pid)
      }));
      ws.send(JSON.stringify(newMessages));
    } else {
      subscriptions.delete(ws);
    }
  });
}

//////////////////////////////////////////////////////////////////////////
const OPEN = 1; // The ready state of WebSocket

let inputMessage = 'Hello';

let messageInterval = setInterval(()=>{
    var latestMessage = generateMessage(inputMessage);
    broadcast(latestMessage);
}, 1000);

let subscribers = [];

// Send message to subscribers 
wsSubcriberServer.on('connection',
           websocket => {
               websocket.on('message',
                      message => {
                          console.log("client sent %s", message);
                          if (message== "subscribe"){
                              subscribers.push(websocket);
                          } else if (message == "unsubscribe"){
                              // remove this client from subscribers
                              subscribers.splice(subscribers.indexOf(websocket), 1);
                          } else if (message != inputMessage){
                            inputMessage = message;
                          }
                      });
           });


function generateMessage (inputMessage: string): string {
   let message: Message = new Message();
   message.message = inputMessage;
   message.sendDate = new Date();
   return JSON.stringify(message);
}

 function broadcast(message: string){
    //wsServer.clients
        subscribers
        .forEach(client => {
            if (client.readyState == OPEN) {
                client.send(message);
            } else{
                // client disconnected - remove it from subscribers
                subscribers.splice(subscribers.indexOf(client), 1);
            }
          }
        );


// Broadcasting to all clients
/*
wsServer.on('connection',
    websocket => wsServer.clients
        .forEach(
            client =>client.send('This message was pushed by the WebSocket server')));*/
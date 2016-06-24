import * as express from "express";
import * as path from "path";
//import * as ws from "ws";
import {Server} from "ws";

const app = express();

/* Serve static resources: client angularjs app */
app.use('/',             express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));


/* Model*/
class Photo {
  constructor(
    public id: number,
    public title: string,
    public year: number
    //public rating: number,
    //public description: string,
    //public categories: Array<string>
    ) {}
}

/* Example data */
const photos = [
    new Photo(0, "First Photo", 2014),
    new Photo(1, "Second Photo", 2015),
    new Photo(2, "Third Photo", 2016)
];

/* Helper functions */
function getPhotos(): Photo[] {
    return photos;
}

function getPhoto(photoId: number): Photo {
    console.log("id=" + photoId);
    return photos.find(p => p.id === photoId);
}

// HTTP Server
app.get('/', (req, res) => {
    //res.send('The URL for photos is http://localhost:8000/photos');
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.get('/photos', (req, res) => {
    res.json(getPhotos());
});
app.get('/photos/:id', (req, res) => {
    res.json(getPhoto(parseInt(req.params.id)));
});
const server = app.listen(8000, "localhost", () => {
    const {address, port} = server.address();
    console.log('HTTP Server is listening on %s', port);
});


// WebSocket Server
var wsServer: Server = new Server({port:8085});

console.log('WebSocket server is listening on port 8085');

wsServer.on('connection',
           websocket => {
               websocket.send('This message was pushed by the WebSocket server');

               websocket.on('message',
                              message => console.log("Server received: %s", message));

           });

// Broadcasting to all clients
/*
wsServer.on('connection',
    websocket => wsServer.clients
        .forEach(
            client =>client.send('This message was pushed by the WebSocket server')));*/
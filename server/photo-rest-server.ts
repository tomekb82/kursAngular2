var express    = require('express');        // call express
//var app        = express();                 // define our app using express

const app = express();

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
    return photos.find(p => p.id === photoId);
}

/* Http API */
app.get('/', (req, res) => {
     res.send('The URL for photos is http://localhost:8000/photos');
 });

app.get('/photos', (req, res) => {
    res.json(getPhotos());
});

app.get('/photos/:id', (req, res) => {
    res.json(getPhoto(parseInt(req.params.id)));
});


const server = app.listen(8000, "localhost", () => {
    const {address, port} = server.address();
    console.log('Listening on %s %s', address, port);
});
export class Photo {
  constructor(
    public id: number,
    public title: string,
    public year: number,
    public rating: number,
    public description: string,
    public categories: Array<string>) {
  }
}

export class PhotoService {
  getPhotos(): Array<Photo> {
    return photos.map(p => new Photo(p.id, p.title, p.year, p.rating, p.description, p.categories));
  }
}

var photos = [
  {
    "id": 0,
    "title": "First Photo",
    "year": 2015,
    "rating": 4.3,
    "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "categories": ["home", "party"]
  },
  {
    "id": 1,
    "title": "Second Photo",
    "year": 2016,
    "rating": 3.5,
    "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "categories": ["children"]
  },
  {
    "id": 2,
    "title": "Third Photo",
    "year": 2014,
    "rating": 4.2,
    "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "categories": ["home"]
  },
  {
    "id": 3,
    "title": "Fourth Photo",
    "year": 2015,
    "rating": 3.9,
    "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "categories": ["children"]
  },
  {
    "id": 4,
    "title": "Fifth Photo",
    "year": 2013,
    "rating": 5,
    "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "categories": ["city", "garden"]
  },
  {
    "id": 5,
    "title": "Sixth Photo",
    "year": 2016,
    "rating": 4.6,
    "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "categories": ["walk"]
  }
];

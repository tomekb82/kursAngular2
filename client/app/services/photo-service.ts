
import { Http, URLSearchParams} from 'angular2/http';
import { EventEmitter, Injectable} from "angular2/core";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

export class Photo {
  constructor(
    public id: number,
    public title: string,
    public year: number,
    public place: string,
    public rating: number,
    public description: string,
    public categories: Array<string>) {
  }
}

export class Review {
  constructor(
      public id: number,
      public photoId: number,
      public timestamp: Date,
      public user: string,
      public rating: number,
      public comment: string) {
  }
}

@Injectable()
export class PhotoService {

  searchEvent: EventEmitter = new EventEmitter();

  constructor( private http: Http){}

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http
      .get('/products', {search: encodeParams(params)})
      .map(response => response.json());
  }

  /*
  getPhotos(): Photo[] {
    return photos.map(p => new Photo(p.id, p.title, p.year, p.rating, p.description, p.categories));
  }
  */
  /*getPhoto(photoId: number): Photo {
    return photos.find(p => p.id === photoId);
  }*/
  getPhotos(): Observable<Product[]>{
    return this.http.get('/photos')
      .map(res => res.json());
  }

  getPhoto(photoId: string): Observable<any>{
    return this.http.get(`/photos/${photoId}`)
      .map(res => res.json());
  }
  getReviewsForPhoto(photoId: number): Review[] {
    return reviews
      .filter(r => r.photoId === photoId)
      .map(r => new Review(r.id, r.photoId, new Date(r.timestamp), r.user, r.rating, r.comment));
  }
  getCategories(): string[] {
    return ['home', 'garden', 'city', 'shop', 'holidays', 'sea'];
  }
 
}

// Another service version implements the initial one as interface.
export class MockPhotoService implements PhotoService { // <2>
  getPhoto(id): Photo {
    // Code making an HTTP request to get actual photo details
    // would go here
    return new Photo(0, "Mock Photo", 2015, 5.6, 
      "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ["home"]);
  }
  getPhotos(): Photo[] {
    return photos.map(p => new Photo(p.id, p.title, p.year, p.rating, p.description, p.categories));
  }
  getReviewsForPhoto(photoId: number): Review[] {
    return reviews
        .filter(r => r.photoId === photoId)
        .map(r => new Review(r.id, r.photoId, new Date(r.timestamp), r.user, r.rating, r.comment));
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

var reviews = [
  {
    "id": 0,
    "photoId": 0,
    "timestamp": "2014-05-20T02:17:00+00:00",
    "user": "User 1",
    "rating": 5,
    "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
  },
  {
    "id": 1,
    "photoId": 0,
    "timestamp": "2014-05-20T02:53:00+00:00",
    "user": "User 2",
    "rating": 3,
    "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
  },
  {
    "id": 2,
    "photoId": 0,
    "timestamp": "2014-05-20T05:26:00+00:00",
    "user": "User 3",
    "rating": 4,
    "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
  },
  {
    "id": 3,
    "photoId": 0,
    "timestamp": "2014-05-20T07:20:00+00:00",
    "user": "User 4",
    "rating": 4,
    "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
  },
  {
    "id": 4,
    "photoId": 0,
    "timestamp": "2014-05-20T11:35:00+00:00",
    "user": "User 5",
    "rating": 5,
    "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
  },
  {
    "id": 5,
    "photoId": 0,
    "timestamp": "2014-05-20T11:42:00+00:00",
    "user": "User 6",
    "rating": 5,
    "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
  }
];
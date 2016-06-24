import {Component, } from 'angular2/core';
import {Control, NgFormControl} from 'angular2/common';
import CarouselComponent from '../carousel/carousel';
import PhotoItemComponent from '../photo-item/photo-item';
import {Photo, PhotoService, MockPhotoService} from '../../services/photo-service';
import {FilterPipe} from '../../pipes/filter-pipe'
import 'rxjs/add/operator/debounceTime';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";

@Component({
  selector: 'photo-home-page',
  //providers: [PhotoService],
  directives: [
    NgFormControl, 
    CarouselComponent,
    PhotoItemComponent
  ],
  pipes: [FilterPipe],
  styleUrls: ['/home.css'],
  template: `
    <div class="row carousel-holder">
      <div class="col-md-12">
        <photo-carousel></photo-carousel>
      </div>
    </div>
    
    <hr>
    
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <h4> Observable with async in template </h4>
          <ul>
            <li *ngFor="#photo of theDataSource | async">
              {{photo.title}}
            </li>
          </ul>
        </div>
      </div>
    </div>      

    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <input placeholder="Filter products by title"
                 class="form-control" type="text"
                 [ngFormControl]="titleFilter">
        </div>
      </div>
    </div>

    <div class="row">
      <div *ngFor="#photo of photos | filter:'title':filterCriteria" class="col-sm-4 col-lg-4 col-md-4">
        <photo-item [photo]="photo"></photo-item>
      </div>
    </div>
  `
})
export default class HomeComponent {
 
  photos: Photo[] = []; 
  theDataSource: Observable<Array<String>>;//Observable;

  titleFilter: Control = new Control();
  filterCriteria: string;

  constructor(private photoService: PhotoService, private http: Http) { 
    //this.photos = this.photoService.getPhotos(); 
    this.theDataSource = this.http.get('/photos')
            .map(res => res.json());

    this.titleFilter.valueChanges
      .debounceTime(100)
      .subscribe(
        value => this.filterCriteria = value,
        error => console.error(error));
  }

  ngOnInit(){
        // Get the data from the server
        this.theDataSource.subscribe(
            data => {
                if (Array.isArray(data)){
                    this.photos=data;
                } else{
                    this.photos.push(data);
                }
            },
            err =>
                console.log("Can't get photos. Error code: %s, URL: %s ",  err.status, err.url),
            () => console.log('Photo(s) are retrieved')
        );
        
        this.photoService.getPhotos()
          .subscribe(
            data => {
                this.photos=data;
            },
            err =>
                console.log("Can't get photos. Error code: %s, URL: %s ",  err.status, err.url),
            () => console.log('Photo(s) are retrieved')
        );
    }


}

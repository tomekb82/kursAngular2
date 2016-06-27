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
      <div *ngFor="#photo of photos | async | filter:'title':filterCriteria" class="col-sm-4 col-lg-4 col-md-4">
        <photo-item [photo]="photo"></photo-item>
      </div>
    </div>
  `
})
export default class HomeComponent {
 
  photos: Observable<Photo[]>;

  titleFilter: Control = new Control();
  filterCriteria: string;

  constructor(private photoService: PhotoService, private http: Http) { 
    this.photos = this.photoService.getPhotos();

    this.titleFilter.valueChanges
      .debounceTime(100)
      .subscribe(
        value => this.filterCriteria = value,
        error => console.error(error));

    this.photoService.searchEvent
      .subscribe(
        params => this.photos = this.photoService.search(params),
        err =>  console.log("Can't get photos. Error code: %s, URL: %s "),
        () => console.log('DONE')
    );  
      
  }

}

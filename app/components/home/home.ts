import {Component, } from 'angular2/core';
import {Control, NgFormControl} from 'angular2/common';
import CarouselComponent from '../carousel/carousel';
import PhotoItemComponent from '../photo-item/photo-item';
import {Photo, PhotoService, MockPhotoService} from '../../services/photo-service';
import {FilterPipe} from '../../pipes/filter-pipe'
import 'rxjs/add/operator/debounceTime';

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
 
  photos: Photo[] = []; // <1>
  titleFilter: Control = new Control();
  filterCriteria: string;

  constructor(private photoService: PhotoService) { // <2>
    this.photos = this.photoService.getPhotos(); // <3>
    this.titleFilter.valueChanges
      .debounceTime(100)
      .subscribe(
        value => this.filterCriteria = value,
        error => console.error(error));
  }
}

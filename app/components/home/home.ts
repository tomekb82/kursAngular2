import {Component} from 'angular2/core';
import CarouselComponent from '../carousel/carousel';
import PhotoItemComponent from '../photo-item/photo-item';
import {Photo, PhotoService} from '../../services/photo-service';

@Component({
  selector: 'photo-home-page',
  providers: [PhotoService],
  directives: [
    CarouselComponent,
    PhotoItemComponent
  ],
  styleUrls: ['/home.css'],
  template: `
    <div class="row carousel-holder">
      <div class="col-md-12">
        <photo-carousel></photo-carousel>
      </div>
    </div>
    <hr>
    <div class="row">
      <div *ngFor="#photo of photos" class="col-sm-4 col-lg-4 col-md-4">
        <photo-item [photo]="photo"></photo-item>
      </div>
    </div>
  `
})
export default class HomeComponent {
 
  photos: Photo[] = []; // <1>

  constructor(private photoService: PhotoService) { // <2>
    this.photos = this.photoService.getPhotos(); // <3>
  }
}

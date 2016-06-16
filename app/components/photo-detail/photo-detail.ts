import {Component, ViewEncapsulation, bind, provide} from 'angular2/core';
import {RouteConfig,  ROUTER_DIRECTIVES, RouteParams, RouteData} from 'angular2/router';
import {Photo, Review, PhotoService, MockPhotoService} from '../../services/photo-service';
import StarsComponent from '../stars/stars';

//uwaga: nie dziala jak jest dolaczone w osobnym pliku
//import PhotoDescriptionComponent from './photo-detail';
//import PhotoParametersComponent from './photo-detail';

@Component({
    selector: 'photo-description',
    template: '<p></p>This is a great photo!'
})
export class PhotoDescriptionComponent {

}

@Component({
    selector: 'photo-parameters',
    template: '<p class="params">id= {{photoID}}, Przesłona: XXX, Migawka: xxx </p>',
    styles: ['.params {background: yellow}'],
    encapsulation: ViewEncapsulation.None
})
export class PhotoParametersComponent {
   photoID: string;
   constructor(params: RouteParams){
        this.photoID = params.get('photoId');
   }
}

@Component({
  selector: 'photo-detail-page',
  //providers: [provide(PhotoService, {useClass: MockPhotoService})], // mock using mock class
  providers: [provide(PhotoService,{useFactory:              // mock using factory
            (isProd) =>{
                      if (isProd){
                        return new PhotoService();
                      } else{
                        return new MockPhotoService();
                      }
            }, deps:["IS_PROD_ENVIRONMENT"]})],
  template: `
    <div class="thumbnail">
      <h4 class="pull-right env-{{type}}">{{ photo.year }}</h4>
      <h3 class="env-{{type}}">{{photo.title}}</h3>
      <hr>
      <img src="http://placehold.it/820x320">
      <b>Description:</b>
      <p>{{ photo.description }}</p>
      
      <div class="ratings">
        <p class="pull-right">{{ reviews.length }} reviews</p>
        <p><photo-stars [rating]="photo.rating"></photo-stars></p>
      </div>

      <b>Categories: </b> <i>{{photo.categories }}</i>

      <hr>
      <router-outlet></router-outlet>
      <p>
   
      <a *ngIf="!showParams" (click)="toggleValue()" [routerLink]="[ './PhotoParameters', {photoId:123}]">Show parameters</a>
      <a *ngIf="showParams" (click)="toggleValue()" [routerLink]="[ './PhotoDescription']">Hide parameters</a>
    </div>
    <div class="well" id="reviews-anchor">
      <div class="row">
        <div class="col-md-12"></div>
      </div>
      <div class="row" *ngFor="#review of reviews">
        <hr>
        <div class="col-md-12">
          <photo-stars [rating]="review.rating"></photo-stars>
          <span>{{ review.user }}</span>
          <span class="pull-right">{{ review.timestamp | date: 'shortDate' }}</span>
          <p>{{ review.comment }}</p>
        </div>
      </div>
    </div>
  `,
  styles: ['.env-prod {background: #286090; color: white;} .env-dev {background: red}'],
  directives: [ROUTER_DIRECTIVES, PhotoDescriptionComponent, PhotoParametersComponent, StarsComponent]
})
@RouteConfig([
    {path: '/', component: PhotoDescriptionComponent, as: 'PhotoDescription'  },
    {path: '/photoParameters/:photoId', component: PhotoParametersComponent, as: 'PhotoParameters'  }
])
export default class PhotoDetailComponent {
  photo: Photo;
  reviews: Review[];
  type: string = "dev";
  showParams = true;

  toggleValue = function(){
    this.showParams = !this.showParams;
  }
  constructor(params: RouteParams, data: RouteData, private photoService: PhotoService){
    if(data.get('isProd')){
      this.type = "prod";
    }

    let photoId: number = parseInt(params.get('photoId'));
    
    this.photo = photoService.getPhoto(photoId);
    this.reviews = photoService.getReviewsForPhoto(this.photo.id);
  }
}




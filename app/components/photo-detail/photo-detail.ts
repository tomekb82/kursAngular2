import {Component, ViewEncapsulation, bind, provide, Inject, Directive, Output, EventEmitter} from 'angular2/core';
import {RouteConfig,  ROUTER_DIRECTIVES, RouteParams, RouteData} from 'angular2/router';
import {Photo, Review, PhotoService, MockPhotoService} from '../../services/photo-service';
import StarsComponent from '../stars/stars';

//uwaga: nie dziala jak jest dolaczone w osobnym pliku
//import PhotoDescriptionComponent from '../photo-detail/photo-description';
//import PhotoParametersComponent from '../photo-detail/photo-parameters';


@Component({
    selector: 'photo-description',
    template: '<p></p>This is a great photo!'
})
export class PhotoDescriptionComponent {

}

interface IPhotoParamaters {
    focus: number,
    zoom: number,
    pixels: number
}

@Directive({
    selector: 'photo-params',
})
class PhotoParameterDirective {
    @Output('generated-params') photoEmitter: EventEmitter <IPhotoParamaters> = new EventEmitter();

    constructor() {
        setInterval(() => {

            let photoParams: IPhotoParamaters = {
         focus: (100*Math.random()).toFixed(2),
         zoom: (100*Math.random()).toFixed(2),
                pixels: (100*Math.random()).toFixed(2)
            };

            this.photoEmitter.emit(photoParams)
        }, 1000);
    }
}

@Component({
    selector: 'photo-parameters',
    template: `<div> <b> Parameters (Output binding):</b>
    - focus = {{focus}}
    - zoom = {{zoom}}
    - pixels = {{pixels}}
    </div>
    <photo-params (generated-params)="photoParamsHandler($event)"> </photo-params>
    `,
    styles: ['.params {background: yellow}'],
    directives: [PhotoParameterDirective],
    encapsulation: ViewEncapsulation.None
})
export default class PhotoParametersComponent {
   focus: number;
   zoom: number;
   pixels: number;

   constructor(){
        
   }

   photoParamsHandler(event:IPhotoParamaters) {
      this.focus = event.focus;
      this.zoom = event.zoom;
      this.pixels = event.pixels;
    }
}

@Component({
  selector: 'photo-detail-page',
  //providers: [provide(PhotoService, {useClass: MockPhotoService})], // mock using mock class
  providers: [provide(PhotoService,{useFactory:              // mock using factory
            (isDev) =>{
                      if (isDev){
                        return new MockPhotoService(); 
                      } else{
                        return new PhotoService();
                      }
            }, deps:["IS_DEV_ENVIRONMENT"]})],
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
      <div *ngIf="isDev">
        <a *ngIf="!showParams" (click)="toggleValue()" [routerLink]="[ './PhotoParameters']">Show random parameters</a>
        <a *ngIf="showParams" (click)="toggleValue()" [routerLink]="[ './PhotoDescription']">Hide parameters</a>
        <pre>
          <router-outlet></router-outlet>  
        </pre>
      </div>  
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
    {path: '/', component: PhotoParametersComponent , as: 'PhotoParameters'  },
    {path: '/description', component: PhotoDescriptionComponent, as: 'PhotoDescription'  }
])
export default class PhotoDetailComponent {
  photo: Photo;
  reviews: Review[];
  type: string = "dev";
  showParams = false;

  toggleValue = function(){
    this.showParams = !this.showParams;
  }
  constructor(params: RouteParams, data: RouteData, private photoService: PhotoService, @Inject('IS_DEV_ENVIRONMENT') private isDev: boolean){
    if(data.get('isProd')){
      this.type = "prod";
    }

    let photoId: number = parseInt(params.get('photoId'));
    
    this.photo = photoService.getPhoto(photoId);
    this.reviews = photoService.getReviewsForPhoto(this.photo.id);
  }
}




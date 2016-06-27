import {Component, ViewEncapsulation, bind, provide, Inject, Directive, Output, EventEmitter} from 'angular2/core';
import {NgFor, NgClass} from 'angular2/common';  
import {RouteConfig,  ROUTER_DIRECTIVES, RouteParams, RouteData, OnDeactivate} from 'angular2/router';
import {Subscription} from 'rxjs/Subscription';

import {Photo, Review, PhotoService, MockPhotoService} from '../../services/photo-service';
import {MessageService} from '../../services/message-service'
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
  /*providers: [provide(PhotoService,{useFactory:              // mock using factory
            (isDev) =>{
                      if (isDev){
                        return new MockPhotoService(); 
                      } else{
                        return new PhotoService();
                      }
            }, deps:["IS_DEV_ENVIRONMENT"]})],*/
  templateUrl: 'app/components/photo-detail/photo-detail.html',
  styles: ['photo-stars.large {font-size: 24px;} .env-prod {background: #286090; color: white;} .env-dev {background: red}'],
  directives: [ROUTER_DIRECTIVES, NgFor, NgClass, 
    PhotoDescriptionComponent, 
    PhotoParametersComponent, 
    StarsComponent]
})
@RouteConfig([
    {path: '/', component: PhotoParametersComponent , as: 'PhotoParameters'  },
    {path: '/description', component: PhotoDescriptionComponent, as: 'PhotoDescription'  }
])
export default class PhotoDetailComponent implements OnDeactivate {
  photo: Photo;
  reviews: Review[];
  
  type: string = "dev";
  showParams = false;

  currentMessage: number;
  newComment: string;
  newRating: number;

  isReviewHidden: boolean = true;
  isWatching: boolean = false;


  toggleValue = function(){
    this.showParams = !this.showParams;
  }

  private subscription: Subscription;

  constructor(params: RouteParams, 
    data: RouteData, 
    private photoService: PhotoService, 
    private messageService: MessageService, 
    @Inject('IS_DEV_ENVIRONMENT') private isDev: boolean){

    if(data.get('isProd')){
      this.type = "prod";
    }

    const photoId = parseInt(params.get('photoId'));

    photoService
      .getPhoto(photoId)
      .subscribe(
        photo => {
          this.photo = photo;
          this.currentMessage = "Test";
        },
        error => console.error(error));

    photoService
      .getReviewsForPhoto(photoId)
      .subscribe(
        reviews => this.reviews = reviews,
        error => console.error(error));
  }

  toggleWatchPhoto() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
      this.isWatching = false;
    } else {
      this.isWatching = true;
      this.subscription = this.messageService.watchPhoto(this.photo.id)
        .subscribe(
          photos => this.currentMessage = photos.find((p: any) => p.photoId === this.photo.id).message,
          error => console.log(error));
    }
  }

  routerOnDeactivate(): any {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addReview() {
    let review = new Review(0, this.photo.id, new Date(), 'Anonymous',
        this.newRating, this.newComment);
    this.reviews = [...this.reviews, review];
    this.photo.rating = this.averageRating(this.reviews);

    this.resetForm();
  }

  averageRating(reviews: Review[]) {
    let sum = reviews.reduce((average, review) => average + review.rating, 0);
    return sum / reviews.length;
  }

  resetForm() {
    this.newRating = 0;
    this.newComment = null;
    this.isReviewHidden = true;
  }
}




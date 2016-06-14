import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig,  ROUTER_DIRECTIVES, RouteParams, RouteData} from 'angular2/router';

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
  template: `
    <div>
      <h3 class="env-{{type}}">{{photoTitle}}</h3>
      <hr>
      <img src="http://placehold.it/820x320">
      <!--<p>{{ photo.description }}</p>
      <hr>
      <i> Categories: {{photo.categories }}</i>-->


      <router-outlet></router-outlet>
      <p>
   
      <a [hidden]="!showParams" (click)="toggleValue()" [routerLink]="[ './PhotoParameters', {photoId:123}]">Show parameters</a>
      <a [hidden]="showParams" (click)="toggleValue()" [routerLink]="[ './PhotoDescription']">Hide parameters</a>

    </div>
  `,
  styles: ['.env-prod {background: #286090; color: white;} .env-dev {background: red}'],
  directives: [ROUTER_DIRECTIVES, PhotoDescriptionComponent, PhotoParametersComponent]
})
@RouteConfig([
    {path: '/', component: PhotoDescriptionComponent, as: 'PhotoDescription'  },
    {path: '/photoParameters/:photoId', component: PhotoParametersComponent, as: 'PhotoParameters'  }
  //  {path: '/photoParameters', component: PhotoParametersComponent, as: 'PhotoParameters'  }
])
export default class PhotoDetailComponent {
  photoTitle: string;
  type: string = "dev";
  showParams = true;

  toggleValue = function(){
    this.showParams = !this.showParams;
  }
  constructor(params: RouteParams, data: RouteData){
    this.photoTitle = params.get('photoTitle');

    if(data.get('isProd')){
      this.type = "prod";
    }
  }
}




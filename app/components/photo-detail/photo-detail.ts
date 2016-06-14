import {Component} from 'angular2/core';
import {RouteParams, RouteData} from 'angular2/router';

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
    </div>
  `,
  styles: ['.env-prod {background: #286090; color: white;} .env-dev {background: red}']
})
export default class PhotoDetailComponent {
  photoTitle: string;
  type: string = "dev";

  constructor(params: RouteParams, data: RouteData){
    this.photoTitle = params.get('photoTitle');

    if(data.get('isProd')){
      this.type = "prod";
    }
  }
}

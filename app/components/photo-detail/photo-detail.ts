import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'photo-detail-page',
  template: `
    <div>
      <h3>{{photoTitle}}</h3>
      <hr>
      <img src="http://placehold.it/820x320">
      <p>{{ photo.description }}</p>
      <hr>
      <i> Categories: {{photo.categories }}</i>
    </div>
  `
})
export default class PhotoDetailComponent {
  photoTitle: string;

  constructor(params: RouteParams){
    this.photoTitle = params.get('photoTitle');
  }
}

import {Component, Input} from 'angular2/core';
import {RouterLink, RouteParams} from 'angular2/router';

import {Photo} from '../../services/photo-service';
import StarsComponent from '../stars/stars';

@Component({
  /* uwaga: 
  Zamiast adnotacji @Input() mozna jawnie dodać parametr w komponencie:
  properties: ['photo']
  */	  
  selector: 'photo-item',
  template: require('./photo-item.html'),
  styles: [require('./photo-item.css')],
  directives: [RouterLink, StarsComponent]
})

export default class PhotoItemComponent {
  @Input() photo: Photo;
}



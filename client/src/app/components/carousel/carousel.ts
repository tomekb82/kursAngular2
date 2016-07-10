import {Component} from 'angular2/core';

@Component({
  selector: 'photo-carousel',
  template: require('./carousel.html')
})
export default class CarouselComponent {

  prev() {
    $('.carousel').carousel('prev');
  }

  next() {
    $('.carousel').carousel('next');
  }
}

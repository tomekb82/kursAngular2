import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import TimerComponent from '../util/timer/timer';

@Component({
  selector: 'photo-nav',
  templateUrl: 'app/components/navbar/navbar.html',
  directives: [RouterLink, TimerComponent]
})
export default class NavbarComponent {}

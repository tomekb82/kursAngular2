import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'photo-nav',
  templateUrl: 'app/components/navbar/navbar.html',
  directives: [RouterLink]
})
export default class NavbarComponent {}

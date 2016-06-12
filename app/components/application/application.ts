// tag::imports[]
import {Component} from 'angular2/core';
// end::imports[]

// tag::annotation-component[]
@Component({
  selector: 'photo-app', // <1>
  providers: [],
  templateUrl: 'app/components/application/application.html', // <3>
  styleUrls: ['app/components/application/application.css'], // <4>
  directives: []
})
// end::annotation-component[]
// tag::class[]
export default class ApplicationComponent {
  
  constructor() { // <2>
    
  }
}
// end::class[]

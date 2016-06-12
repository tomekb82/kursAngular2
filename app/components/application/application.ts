// tag::imports[]
import {Component} from 'angular2/core';
import FooterComponent from 'app/components/footer/footer';
import SearchComponent from 'app/components/search/search';
// end::imports[]

// tag::annotation-component[]
@Component({
  selector: 'photo-app', // <1>
  providers: [],
  templateUrl: 'app/components/application/application.html', // <3>
  styleUrls: ['app/components/application/application.css'], // <4>
  directives: [FooterComponent,
  SearchComponent]
})
// end::annotation-component[]
// tag::class[]
export default class ApplicationComponent {
  
  constructor() { // <2>
    
  }
}
// end::class[]

// tag::imports[]
import {Component} from 'angular2/core';
import {Route, RouteConfig, RouterOutlet} from 'angular2/router';

import FooterComponent from '../footer/footer';
import SearchComponent from '../search/search';
import NavbarComponent from '../navbar/navbar';
import HomeComponent from '../home/home';
import {ContactComponent, ChatComponent} from '../contact/contact';
import PhotoDetailComponent from "../photo-detail/photo-detail";
import PhotoMediatorComponent from "../photo-mediator/photo-mediator";


// end::imports[]

// tag::annotation-component[]
@Component({
  selector: 'photo-app', // <1>
  templateUrl: 'app/components/application/application.html', // <3>
  styleUrls: ['app/components/application/application.css'], // <4>
  directives: [
   RouterOutlet,
   FooterComponent,
   SearchComponent,
   NavbarComponent,
   HomeComponent,
   PhotoDetailComponent,
   ContactComponent,
   ChatComponent,
   PhotoMediatorComponent]
})
@RouteConfig([
  {path: '/', component: HomeComponent, as: 'Home'},
  {path: '/photos/:photoId/...', component: PhotoDetailComponent, as: 'PhotoDetail' , data:{isProd: true}},

  {path: '/contact', component: ContactComponent, as: 'Contact'},
  {path: '/mediator', component: PhotoMediatorComponent, as: 'Mediator'},

  {aux: '/chat', component: ChatComponent, as: 'Chat'},

  {path:'/about',  loader: ()=> System.import('app/components/about/about')
                   .then(libModule => libModule.AboutComponent),
                   as: 'About'}
])
// end::annotation-component[]
// tag::class[]
export default class ApplicationComponent {
  
}
// end::class[]

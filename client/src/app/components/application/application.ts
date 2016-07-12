// tag::imports[]
import {Component} from 'angular2/core';
import {Route, RouteConfig, RouterOutlet} from 'angular2/router';

import FooterComponent from '../footer/footer';
import SearchComponent from '../search/search';
import NavbarComponent from '../navbar/navbar';
import HomeComponent from '../home/home';
import {WeatherComponent, ChatComponent} from '../weather/weather';
import PhotoDetailComponent from "../photo-detail/photo-detail";
import PhotoMediatorComponent from "../photo-mediator/photo-mediator";
import FormsComponent from "../forms/forms";
import MessageSubscriberComponent from '../message/message-subscriber';
import ControlsComponent from '../../kontrolki/controls';


// end::imports[]

// tag::annotation-component[]
@Component({
  selector: 'photo-app', // <1>
  template: require('./application.html'),
  styles: [require('./application.css')],
  directives: [
   RouterOutlet,
  FooterComponent,
   SearchComponent,
   NavbarComponent,
   HomeComponent,

  PhotoDetailComponent,
   WeatherComponent,
   ChatComponent,
   PhotoMediatorComponent,
   FormsComponent,
   MessageSubscriberComponent,

   ControlsComponent]
})
@RouteConfig([
  {path: '/', component: HomeComponent, name: 'Home'},
  {path: '/photos/:photoId/...', component: PhotoDetailComponent, name: 'PhotoDetail' , data:{isProd: true}},
  {path: '/weather', component: WeatherComponent, name: 'Weather'},
  {path: '/mediator', component: PhotoMediatorComponent, name: 'Mediator'},
  {path: '/controls', component: ControlsComponent, name: 'Controls'},
   {path: '/forms', component: FormsComponent, name: 'Forms'},
  {path: '/ws', component: MessageSubscriberComponent, name: 'WebSockets'},

  {aux: '/chat', component: ChatComponent, name: 'Chat'},

  /*{path:'/about',  loader: ()=> System.import('app/components/about/about')
                   .then(libModule => libModule.AboutComponent),
                   name: 'About'}*/
])
// end::annotation-component[]
// tag::class[]
export default class ApplicationComponent {
  
}
// end::class[]

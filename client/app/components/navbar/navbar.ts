import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import TimerComponent from '../util/timer/timer';
import {GeoService} from '../../services/geo-service';

@Component({
  selector: 'photo-nav',
  providers: [GeoService],
  templateUrl: 'app/components/navbar/navbar.html',
  directives: [RouterLink, TimerComponent]
})
export default class NavbarComponent {


  myIp:String;

  constructor(private geoService: GeoService){};

	ngOnInit(){
  	this.geoService.getGeoIp()
          .subscribe(
         res => {
           console.log(res);
           this.myIp=`IP address is: ${res.ip}`;
          // Latitude: ${res.latitude},
          // Longitude: ${res.longitude}`;
         } ,
         err =>
           console.log("Can't get geo. Error code: %s, URL: %s ",  err.message, err.url),
         () => console.log(`Geo is retrieved`)
       );
      }



}

import {Component} from 'angular2/core';
import {Control, NgFormControl} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import {WeatherService} from '../../services/weather-service';

@Component({
    selector: 'contact',
    template: `<div class="contact">Contact Component 
                   <br>
                   <input type="text" style="color:black" placeholder="Type city name" [ngFormControl]="searchCity"/>
                   <h3>{{temperature}}</h3>
               </div>`,
    styles: [`.contact {background: #286090; color: white; padding: 15px 0 0 30px;  height: 80px; width:100%;
                    float:left; box-sizing:border-box;}`],
    providers: [WeatherService]})   
export class ContactComponent {
    private baseWeatherURL: string= 'http://api.openweathermap.org/data/2.5/find?q=';
    private urlSuffix: string = "&units=imperial&appid=ed9e3bd9520c05c5a7a47ab7576a3386";

	searchCity: Control;
    temperature: string;
    constructor(private http:Http, private weatherService: WeatherService){
        this.searchCity = new Control('');
        /*this.searchCity.valueChanges
            .debounceTime(500)
            .subscribe(city => weatherService.getWeather(http, city));*/
        this.searchCity.valueChanges
            .debounceTime(200)
            .switchMap(city => this.getWeather(city))
            .subscribe(
                res => {
                    if (res['cod'] === '404') return;
                    if (!res.list[0]) {
                        this.temperature ='City is not found';
                    } else {

                        this.temperature =
                            `Current temperature is  ${res.list[0].main.temp}F, ` +
                            `humidity: ${res.list[0].main.humidity}%`;
                    }
                },
                err => console.log(`Can't get weather. Error code: %s, URL: %s`, err.message, err.url),
                () => console.log(`Weather is retrieved`)
            );
    }

    getWeather(city): Observable<Array> {
      return this.http.get(this.baseWeatherURL + city + this.urlSuffix)
        .map(res => res.json());
    }

}

@Component({
    selector: 'chat',
    template: `<textarea placeholder="Chat with customer service (Aux routing)"
                       class="chat"></textarea>`,
    styles: [`.chat {background: #eee; height: 80px;width:100%; 
                     float:left; display:block; box-sizing:border-box;} `]})
export class ChatComponent{
}
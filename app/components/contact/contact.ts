import {Component} from 'angular2/core';
import {Control, NgFormControl} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import {WeatherService} from '../../services/weather-service';
import {TemperaturePipe} from '../../pipes/temperature-pipe';

@Component({
    selector: 'contact',
    template: `<div class="contact form-group">Contact Component 
                   <br>
                   <input type="text" style="color:black" placeholder="Type city name" [ngFormControl]="searchCity"/>
                   
               </div>
               <pre *ngIf="temperatureDescription"> {{temperatureDescription}}</pre>

              <div class="form-group">
                  <input type='text' value="0" placeholder= "Enter temperature" [(ngModel)] = "temperature">
                  <button (click)="toggleFormat()">Toggle Format</button>
                  <br>In {{targetFormat}} this temperature is {{temperature | temperaturePipe: format | number:'1.1-2'}}
              </div>
               `,
    styles: [`.contact {background: #286090; color: white; padding: 15px 0 0 30px;  height: 80px; width:100%;
                    float:left; box-sizing:border-box;}`],
    providers: [WeatherService],
    pipes:[TemperaturePipe]  })
export class ContactComponent {
    private API_KEY: string = "c3f4b5f050695675a49a9083685892a7";
    private baseWeatherURL: string= 'http://api.openweathermap.org/data/2.5/find?q=';
    private urlSuffix: string = "&units=imperial&appid=" + this.API_KEY;

	searchCity: Control;
    temperature: string;
    temperatureDescription: string;
    toCelsius: boolean=true;
    targetFormat: string ='Celsius';
    format: string='FtoC';

    toggleFormat(){
        this.toCelsius = !this.toCelsius;
        this.format = this.toCelsius? 'FtoC': 'CtoF';
        this.targetFormat = this.toCelsius?'Celsius':'Fahrenheit';
    }

    constructor(private http:Http, private weatherService: WeatherService){
        this.searchCity = new Control('');
        /*this.searchCity.valueChanges
            .debounceTime(500)
            .subscribe(city => weatherService.getWeather(http, city));*/
        this.searchCity.valueChanges
            .debounceTime(500)
            .switchMap(city => this.getWeather(city))
            .subscribe(
                res => {
                    if (res['cod'] === '404') return;
                    if (!res.list[0]) {
                        this.temperature ='City is not found';
                    } else {

                        this.temperatureDescription =
                            `Current temperature is  ${res.list[0].main.temp}F, ` +
                            `humidity: ${res.list[0].main.humidity}%`;
                        this.temperature = res.list[0].main.temp;
                        console.log(this.temperature);    
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
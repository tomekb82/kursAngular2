import {Component} from 'angular2/core';  
import {Control, NgFormControl} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import {WeatherService, WeatherResult} from '../../services/weather-service';
import {TemperaturePipe} from '../../pipes/temperature-pipe';
import OnPushComponent from '../onPush/onPush';

@Component({
    selector: 'contact',
    template: `<div class="contact form-group">Contact Component 
                   <br>
                  
                   
               </div>


               <h2>Weather</h2>
                <input type="text" style="color:black" placeholder="Enter city" [ngFormControl]="searchCity">
                <h3>Current weather in {{weather?.place}}:</h3>
                <ul>
                  <li>Temperature: {{weather?.temperature}}F</li>
                  <li>Humidity: {{weather?.humidity}}%</li>
                </ul>

              <div class="form-group">
                  <input type='text' value="0" placeholder= "Enter temperature" [(ngModel)] = "temperature">
                  <button (click)="toggleFormat()">Toggle Format</button>
                  <br>In {{targetFormat}} this temperature is {{temperature | temperaturePipe: format | number:'1.1-2'}}
              </div>

              <div class="form-group">
                <on-push></on-push>
              </div>


               `,
    styles: [`.contact {background: #286090; color: white; padding: 15px 0 0 30px;  height: 80px; width:100%;
                    float:left; box-sizing:border-box;}`],
    providers: [WeatherService],
    directives: [OnPushComponent],
    pipes:[TemperaturePipe]  })
export class ContactComponent {
   

	searchCity: Control;
  weather: WeatherResult;

    temperature: string;
    toCelsius: boolean=true;
    targetFormat: string ='Celsius';
    format: string='FtoC';

    toggleFormat(){
        this.toCelsius = !this.toCelsius;
        this.format = this.toCelsius? 'FtoC': 'CtoF';
        this.targetFormat = this.toCelsius?'Celsius':'Fahrenheit';
    }

    constructor(private weatherService: WeatherService){
        this.searchCity = new Control('');
       
        this.searchCity.valueChanges
        .debounceTime(500)
        .switchMap((city: string) => weatherService.getWeather(city))
        .subscribe(
            (weather: WeatherResult) => this.weather = weather,
            error => console.error(error),
            () => console.log('Weather is retrieved'));
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
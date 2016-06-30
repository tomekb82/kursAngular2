// Import Angular 2 and application modules.
import {bootstrap} from 'angular2/platform/browser';
import {provide, enableProdMode} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import ApplicationComponent  from "./components/application/application";
import {PHOTO_APP_SERVICES} from './services/services';
import {WEATHER_URL_BASE, WEATHER_URL_SUFFIX, WeatherService} from './services/weather-service';
//import {PhotoService} from "./services/photo-service";
//const DEFAULT_SERVICE_PROVIDERS = [ PhotoService ];

//enableProdMode();

bootstrap(ApplicationComponent, [
    FORM_PROVIDERS,
  	HTTP_PROVIDERS,
  	ROUTER_PROVIDERS,
    //DEFAULT_SERVICE_PROVIDERS,
    provide("IS_DEV_ENVIRONMENT",{useValue:false}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),

    PHOTO_APP_SERVICES,
    provide(WEATHER_URL_BASE, {useValue: 'http://api.openweathermap.org/data/2.5/find?q='}),
    provide(WEATHER_URL_SUFFIX, {useValue: '&units=imperial&appid=c3f4b5f050695675a49a9083685892a7'}),
    WeatherService
]);


	
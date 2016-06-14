// Import Angular 2 and application modules.
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import ApplicationComponent from "./components/application/application";

//uwaga: dodanie domyslnej uslugi
//import PhotoService from "./components/services/photo-service";

//const DEFAULT_SERVICE_PROVIDERS = [ PhotoService ];

bootstrap(ApplicationComponent, [
    ROUTER_PROVIDERS,
  //  DEFAULT_SERVICE_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);



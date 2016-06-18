// Import Angular 2 and application modules.
import {bootstrap} from 'angular2/platform/browser';
import {provide, enableProdMode} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import ApplicationComponent  from "./components/application/application";
import {PhotoService} from "./services/photo-service";

const DEFAULT_SERVICE_PROVIDERS = [ PhotoService ];

enableProdMode();

bootstrap(ApplicationComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    DEFAULT_SERVICE_PROVIDERS,
    provide("IS_DEV_ENVIRONMENT",{useValue:true}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
    
]);



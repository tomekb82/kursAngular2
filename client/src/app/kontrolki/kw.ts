import { Injectable} from "angular2/core";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Kf} from './kf';

@Injectable()
export class Kw {

    constructor(private kf:Kf ){
    	console.log(this.kf.pokaz());
    }

    pokaz(){
    	return "Kw test";
    }

}

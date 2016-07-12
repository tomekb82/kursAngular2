import { Injectable} from "angular2/core";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Pu} from './pu';

@Injectable()
export class Kf {

    constructor(private pu:Pu ){

    	console.log(this.pu.pokaz());
    }

    pokaz(){
    	return "Kf test";
    }

}

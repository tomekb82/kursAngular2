import { Injectable} from "angular2/core";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class Pu {

    constructor( ){}

    pokaz(){
    	return "Pu test";
    }

}


import {HTTP_PROVIDERS, Http} from 'angular2/http';
import { Injectable} from "angular2/core";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class GeoService {

	private baseURL: string=  'http://jsonip.com';//http://www.telize.com/geoip?callback=?';
    
	constructor( private http: Http){}

	getGeoIp(): Observable  {
		return this.http.get(this.baseURL)
			.map(res => res.json());
 	}
}

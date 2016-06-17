import {HTTP_PROVIDERS, Http} from 'angular2/http';

export class WeatherService {

	private baseWeatherURL: string= 'http://api.openweathermap.org/data/2.5/find?q=';
    private urlSuffix: string = "&units=imperial&appid=ed9e3bd9520c05c5a7a47ab7576a3386";
	
	temperature: string;

	getWeather(http, city) {
		console.log("city = " + city);
		http.get(this.baseWeatherURL + city + this.urlSuffix)
			.map(res => res.json())
 			.subscribe(
 				res => {
 					console.log(res);
 					this.temperature=`Current temperature in ${city} is
 					${res.list[0].main.temp}F,
 					humidity: ${res.list[0].main.humidity}%`;
 				} ,
 				err =>
 					console.log("Can't get weather. Error code: %s, URL: %s ",  err.message, err.url),
 				() => console.log(`Weather for ${city} is retrieved`)
 			);
 	}
}



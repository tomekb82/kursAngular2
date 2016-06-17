import {Component, Input, Inject} from 'angular2/core';
import LogDirective from 'app/directives/logging';

@Component({
    selector: 'search-processor',
    template: `
    Photo place (2 way data binding):  {{place}} 
  `,
    styles:[`:host {background: cyan;}`]
})
class SearchProcessorComponent {

	@Input('year') year: number;
  //  @Input('place') place: string;

  private _place: string;

  @Input('place')
  set setPlace(value: string) {
    this._place = value;
  }

  get place(): string {
    return this._place;
  }
}

@Component({
  selector: 'photo-search',
  directives: [LogDirective, SearchProcessorComponent],
  templateUrl: 'app/components/search/search.html',
  styles: ['.textarea {height: 100px; width: 220px;}'],
})
export default class SearchComponent {

	categories: string[];

	searchTitle: string = '';
	searchPlace: string = '';

	searchTextarea: string = ""

  isDev: boolean;
 
  onInputSearchTitleEvent(event: Event): void {
   	let inputElement: HTMLInputElement = <HTMLInputElement> event.target;

   	this.searchTextarea = "The input property value = " + inputElement.value;
   	this.searchTextarea += "\nThe input attribute value =" + inputElement.getAttribute('value');
   	this.searchTextarea += "\nThe title property value =" + this.searchTitle;
  }

	constructor(@Inject('IS_DEV_ENVIRONMENT') private isDevEnv: boolean) {
   	this.categories = ['a', 'b', 'c', 'd'];
    this.isDev = isDevEnv;
    console.log("iddev=" + this.isDev);
    
  }
    
}

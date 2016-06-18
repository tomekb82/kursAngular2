import {Component, Input, Inject} from 'angular2/core';
import {Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import 'rxjs/add/operator/debounceTime';
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
  searchCategory: Control;
  searchYear:number;

	searchTitle: string = '';
	searchPlace: string = '';

	searchTextarea: string = ""

  onSelectEvent({target}):void{
    this.searchPlace=target.value;
  }

  onInputSearchTitleEvent(event: Event): void {
   	let inputElement: HTMLInputElement = <HTMLInputElement> event.target;

   	this.searchTextarea = "The input property value = " + inputElement.value;
   	this.searchTextarea += "\nThe input attribute value =" + inputElement.getAttribute('value');
   	this.searchTextarea += "\nThe title property value =" + this.searchTitle;
  }

	constructor(@Inject('IS_DEV_ENVIRONMENT') private isDev: boolean) {
   	this.categories = ['a', 'b', 'c', 'd'];

    this.searchCategory = new Control('');
    this.searchCategory.valueChanges
      .debounceTime(500)
      .subscribe(category => this.getYearFromServer(category));
  }

  getYearFromServer(category) {
        this.searchYear = 12*Math.random().toFixed(4);
        console.log("The year for the ${category} is:" + this.searchYear );
    }
    
}

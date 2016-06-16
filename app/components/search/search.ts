import {Component, Input} from 'angular2/core';
import LogDirective from 'app/directives/logging';

@Component({
    selector: 'search-processor',
    template: `
    Photo title:  {{title}} 
  `,
    styles:[`:host {background: cyan;}`]
})
class SearchProcessorComponent {

	@Input('year') year: number;
  //  @Input('title') title: string;

    private _title: string;

    @Input('title')
    set setTitle(value: string) {
        this._title = value;
    }

    get title(): string {
        return this._title;
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

	searchTextarea: string = ""

  	onInputSearchTitleEvent(event: Event): void {
    	let inputElement: HTMLInputElement = <HTMLInputElement> event.target;

    	this.searchTitle = inputElement.value;
    	this.searchTextarea = "The input property value = " + inputElement.value;
    	this.searchTextarea += "\nThe input attribute value =" + inputElement.getAttribute('value');
    	this.searchTextarea += "\nThe title property value =" + this.searchTitle;
  	}

	constructor() {
    	this.categories = ['a', 'b', 'c', 'd'];

   	}
}

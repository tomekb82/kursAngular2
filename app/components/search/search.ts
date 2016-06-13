import {Component} from 'angular2/core';
import LogDirective from 'app/directives/logging';

@Component({
  selector: 'photo-search',
  directives: [LogDirective],
  templateUrl: 'app/components/search/search.html'
})
export default class SearchComponent {

	categories: string[];

	constructor() {
    	this.categories = ['a', 'b', 'c', 'd'];

   	}

}

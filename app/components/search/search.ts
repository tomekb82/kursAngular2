import {Component} from 'angular2/core';

@Component({
  selector: 'photo-search',
  templateUrl: 'app/components/search/search.html'
})
export default class SearchComponent {

	categories: string[];

	constructor() {
    	this.categories = ['a', 'b', 'c', 'd'];

   	}


}

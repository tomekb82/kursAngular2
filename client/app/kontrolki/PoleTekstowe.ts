import {Component, Input} from 'angular2/core';

@Component({
  selector: 'PoleTekstowe',
  template: `
  		<label> pole tekstowe</label>
		<input type="text" [value] = "wartosc" />
  `
})
export default class PoleTekstowe {

	@Input('wartosc') wartosc;
}
import {Component} from 'angular2/core';

import PoleTekstowe from './PoleTekstowe';
import PoleRadio from './PoleRadio';

@Component({
  selector: 'controls-examples',
  directives: [PoleTekstowe, PoleRadio],
  template: `
  		<PoleTekstowe [(wartosc)]="wartoscPolaTestowego"> </PoleTekstowe>
  		<hr>
  		<PoleRadio [(wartosci)]="wartosciPolaRadio"> </PoleRadio>
		<hr>
  		<pre>
			Wartość pola tekstowego: {{wartoscPolaTestowego}}
			Wartość pola radio: {{wartosciPolaRadio | json}}
			
  		</pre>
 `
})
export default class ControlsComponent {

	wartoscPolaTestowego:string = "Przykladowy tekst";

	wartosciPolaRadio = [
	{
		"nazwa":"Opcja1",
		"wybrany": false
	},
	{
		"nazwa":"Opcja2",
		"wybrany": true
	},
	{
		"nazwa":"Opcja3",
		"wybrany": false
	}];
	
}
import {Component} from 'angular2/core';

import PoleTekstowe from './PoleTekstowe';

@Component({
  selector: 'controls-examples',
  directives: [PoleTekstowe],
  template: `
  		<PoleTekstowe [(wartosc)]="wartoscPolaTestowego"> </PoleTekstowe>

		<hr>
  		<pre>
			Wartość pola tekstowego: {{wartoscPolaTestowego}}
  		</pre>
  `
})
export default class ControlsComponent {

	wartoscPolaTestowego:string;
	
}
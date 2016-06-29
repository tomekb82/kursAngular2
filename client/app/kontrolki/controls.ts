import {Component} from 'angular2/core';

import PoleTekstowe from './PoleTekstowe';
import PoleRadio from './PoleRadio';
import PoleCheckbox from './PoleCheckbox';
import PoleCombo from './PoleCombo';

@Component({
  selector: 'controls-examples',
  directives: [PoleTekstowe, PoleRadio, PoleCheckbox, PoleCombo],
  template: `
  		<a *ngIf="pokazPoleTekstowe" (click)="pokazPoleTekstowe=!pokazPoleTekstowe">Ukryj</a>
        <a *ngIf="!pokazPoleTekstowe" (click)="pokazPoleTekstowe=!pokazPoleTekstowe">Pokaż</a>
  		<h4> Pole tekstowe </h4>
  		<div *ngIf="pokazPoleTekstowe">
  			<PoleTekstowe [(wartosc)]="wartoscPolaTestowego"> </PoleTekstowe>
  			<pre>
				Wartość pola tekstowego: {{wartoscPolaTestowego}}	
  			</pre>
  		</div>

  		<hr>
  		<a *ngIf="pokazPoleRadio" (click)="pokazPoleRadio=!pokazPoleRadio">Ukryj</a>
        <a *ngIf="!pokazPoleRadio" (click)="pokazPoleRadio=!pokazPoleRadio">Pokaż</a>
  		<h4> Pole radio </h4>
  		<div *ngIf="pokazPoleRadio">
  			<PoleRadio [(wartosci)]="wartosciPolaRadio"> </PoleRadio>
  			<pre>
				Wartość pola radio: {{wartosciPolaRadio | json}}
  			</pre>
  		</div>

		<hr>
		<a *ngIf="pokazPoleCheckbox" (click)="pokazPoleCheckbox=!pokazPoleCheckbox">Ukryj</a>
        <a *ngIf="!pokazPoleCheckbox" (click)="pokazPoleCheckbox=!pokazPoleCheckbox">Pokaż</a>
  		<h4> Pole checkbox </h4>
  		<div *ngIf="pokazPoleCheckbox">
			<PoleCheckbox [(wartosci)]="wartosciPolaCheckbox"> </PoleCheckbox>
			<pre>
				Wartość pola checkbox: {{wartosciPolaCheckbox | json}}			
  			</pre>
  	    </div>
  	    		
		<hr>
		<a *ngIf="pokazPoleCombo" (click)="pokazPoleCombo=!pokazPoleCombo">Ukryj</a>
        <a *ngIf="!pokazPoleCombo" (click)="pokazPoleCombo=!pokazPoleCombo">Pokaż</a>
  		<h4> Pole combobox </h4>
  		<div *ngIf="pokazPoleCombo">
			<PoleCombo [(wartosci)]="wartosciPolaCombo"> </PoleCombo>
			<pre>
				Wartość pola combo: {{wartosciPolaCombo | json}}			
  			</pre>
  	    </div>
  		
 `
})
export default class ControlsComponent {

    pokazPoleTekstowe:boolean = true;
    pokazPoleRadio:boolean = true;
    pokazPoleCheckbox:boolean = true;
    pokazPoleCombo:boolean = true;

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

	wartosciPolaCheckbox = [
	{
		"nazwa":"Wybor1",
		"wybrany": true
	},
	{
		"nazwa":"Wybor2",
		"wybrany": false
	},
	{
		"nazwa":"Wybor3",
		"wybrany": true
	}];

	wartosciPolaCombo = [
	{
		"nazwa":"Opcja1",
		"wybrany": false
	},
	{
		"nazwa":"Opcja2",
		"wybrany": false
	},
	{
		"nazwa":"Opcja3",
		"wybrany": true
	}];
	
}
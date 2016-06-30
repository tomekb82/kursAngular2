import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {
  Control,
  ControlArray,
  ControlGroup,
  FormGroup,
  FormControl,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  NG_VALIDATORS,
  Validators,
  FormBuilder  
} from 'angular2/common';

@Component({
  selector: 'PoleTekstowe',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  		<label> Etykieta pola tekstowego</label>
		<input type="text" [(ngModel)] = "wartosc" 
     (input)="onInputTextEvent($event)" [ngControl]="username?.id"/>
		`
})
export default class PoleTekstowe {

   private _wartosc:string;

   @Input() username;

   @Input()
   get wartosc(): string {
     return this._wartosc;
   }

   set wartosc(value: string) {
     this._wartosc = value || '';
   }

   @Output() wartoscChange: EventEmitter<string> = new EventEmitter();

   onInputTextEvent(event: Event): void {
   	let inputElement: HTMLInputElement = <HTMLInputElement> event.target;
   	this.wartoscChange.emit(inputElement.value);
   }
}
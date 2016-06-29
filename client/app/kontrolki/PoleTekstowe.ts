import {Component, Input, Output, EventEmitter, OnChanges, SimpleChange} from 'angular2/core';

interface IChanges {[key: string]: SimpleChange};

@Component({
  selector: 'PoleTekstowe',
  template: `
  		<label> pole tekstowe</label>
		<input type="text" [(ngModel)] = "wartosc" (input)="onInputTextEvent($event)"/>
		`
})
export default class PoleTekstowe {

   private _wartosc:string;

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
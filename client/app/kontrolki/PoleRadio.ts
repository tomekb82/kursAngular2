import {Component, Input, Output, EventEmitter, ngFor} from 'angular2/core';

@Component({
  selector: 'PoleRadio',
  template: `
    <label> Etykieta pola radio</label>
    <span *ngFor="#element of wartosci">
     <input type="radio" name="opcje" 
       (click)="ustawRadio(element)" 
       [checked]="element.wybrany === true">
      {{element.nazwa}}
    </span>
    
  `
})
export default class PoleRadio {
  
  private _wartosci:any;

   @Input()
   get wartosci(): any {
     return this._wartosci;
   }

   set wartosci(values: any) {
     this._wartosci = values;
   }

   @Output() wartosciChange: EventEmitter<any> = new EventEmitter();

   ustawRadio(element: any){
       this.wartosci.map(p => p.wybrany = false);
       this.wartosci
      	.filter(p => p.nazwa === element.nazwa)
      	.map(p => p.wybrany = true);
    }

}
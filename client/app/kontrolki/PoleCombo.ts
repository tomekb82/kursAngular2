import {Component, Input, Output, EventEmitter, ngFor} from 'angular2/core';

@Component({
  selector: 'PoleCombo',
  template: `
    <label> Etykieta pola combo</label>
    <select id="combo" 
          (change)="ustawCombo($event)">
      <option value="wszystkie">Wszystkie</option>
      <option *ngFor="#element of wartosci" 
            [value]="element.nazwa">{{element.nazwa}}</option>
    </select>  
    
  `
})
export default class PoleCombo {
  
  private _wartosci:any;

   @Input()
   get wartosci(): any {
     return this._wartosci;
   }

   set wartosci(values: any) {
     this._wartosci = values;
   }

   @Output() wartosciChange: EventEmitter<any> = new EventEmitter();

    ustawCombo({target}):void{
    	if(target.value === "wszystkie"){
    		this.wartosci.map(p => p.wybrany = true);
    	}else {
    		this.wartosci.map(p => p.wybrany = false);
    		this.wartosci
      			.filter(p => p.nazwa === target.value)
      			.map(p => p.wybrany = true);
      	}
    }

}
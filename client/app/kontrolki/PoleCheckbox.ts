import {Component, Input, Output, EventEmitter, ngFor} from 'angular2/core';

@Component({
  selector: 'PoleCheckbox',
  template: `
    <label> Etykieta pola checkbox</label>
    <span *ngFor="#element of wartosci; #i=index">                                         
   		<input type="checkbox" id="{{element.id}}" 
   		[checked]="element.wybrany === true"                                       
    	(click)="ustawCheckbox(element)">
         {{element.nazwa}} 
    </span>
    
  `
})
export default class PoleCheckbox {
  
  private _wartosci:any;

   @Input()
   get wartosci(): any {
     return this._wartosci;
   }

   set wartosci(values: any) {
     this._wartosci = values;
   }

   @Output() wartosciChange: EventEmitter<any> = new EventEmitter();

   ustawCheckbox(element: any){
       this.wartosci
      	.filter(p => p.nazwa === element.nazwa)
      	.map(p => p.wybrany = !p.wybrany);
    }

}
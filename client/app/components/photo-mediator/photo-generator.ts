import {bootstrap} from 'angular2/platform/browser';
import {Component, Output, Directive, EventEmitter} from 'angular2/core';
import {IPhoto} from './photo';

@Component({
    selector: 'photo-generator',
    template: `<strong><input type="button" value="Generate photo" (click)="generatPhoto($event)">
               {{photoName}} {{photoYear}}</strong>
              `,
    styles:[`:host {background: pink; padding: 5px 15px 15px 15px;}`]
})
export class PhotoGeneratorComponent {
    @Output() generate: EventEmitter <IPhoto> = new EventEmitter();

    photoName: string = "Test photo";
    photoYear:number;

    constructor() {
        setInterval(() => {
            this.photoYear = (100*Math.random());
            console.log(this.photoYear);
        }, 2000);
    }

    generatPhoto(): void{

        let generatedPhoto: IPhoto = {
            name: this.photoName,
            year: this.photoYear
        };

        this.generate.emit(generatedPhoto);
    }
}
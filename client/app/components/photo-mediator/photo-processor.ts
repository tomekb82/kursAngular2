import {bootstrap} from 'angular2/platform/browser';
import {Component, Input} from 'angular2/core';
import {IPhoto} from './photo';

@Component({
    selector: 'photo-processor',
    template: `{{message}}`,
    styles:[`:host {background: cyan;}`]
})
export class PhotoProcessorComponent {

    message:string = "Waiting for the photos...";

    private _photo: IPhoto;

    @Input() set photo(value: IPhoto ){
        if (value && value.year != undefined) {
            this.message = `Photo name is ${value.name} made in ${value.year}`;
        }
    }

    get photo(): IPhoto{
        return this._photo;
    }
}

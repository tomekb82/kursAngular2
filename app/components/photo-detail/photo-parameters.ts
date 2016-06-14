import {Component, ViewEncapsulation} from 'angular2/core';
import { RouteParams} from 'angular2/router';

@Component({
    selector: 'photo-parameters',
    template: '<p class="params">Przesłona: XXX, Migawka: xxx </p>',
    styles: ['.params {background: yellow}'],
    encapsulation: ViewEncapsulation.None
})
export default class PhotoParametersComponent {
   photoID: string;
    constructor(params: RouteParams){
        this.photoID = params.get('photoId');
    }

}
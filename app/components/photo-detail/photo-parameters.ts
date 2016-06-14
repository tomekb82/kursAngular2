import {Component, ViewEncapsulation} from 'angular2/core';

@Component({
    selector: 'photo-parameters',
    template: '<p class="params">id= {{photoID}}, Przesłona: XXX, Migawka: xxx </p>',
    styles: ['.params {background: yellow}'],
    encapsulation: ViewEncapsulation.None
})
export class PhotoParametersComponent {
   photoID: string;
   constructor(params: RouteParams){
        this.photoID = params.get('photoId');
  
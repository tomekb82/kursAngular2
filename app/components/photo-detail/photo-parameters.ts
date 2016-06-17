import {Component, ViewEncapsulation, Directive, Output, EventEmitter} from 'angular2/core';


interface IPhotoParamaters {
    focus: number,
    zoom: number,
    pixels: number
}

@Directive({
    selector: 'photo-params',
})
class PhotoParameterDirective {
    @Output('generated-params') photoEmitter: EventEmitter <IPhotoParamaters> = new EventEmitter();

    constructor() {
        setInterval(() => {

            let photoParams: IPhotoParamaters = {
 				focus: (100*Math.random()).toFixed(2),
 				zoom: (100*Math.random()).toFixed(2),
                pixels: (100*Math.random()).toFixed(2)
            };

            this.photoEmitter.emit(photoParams)
        }, 1000);
    }
}

@Component({
    selector: 'photo-parameters',
    template: `<div class="params">Photo id: {{photoID}} 
    			Parameters: {{focus}}/{{zoom}}/{{pixels}}</div>
				
				<photo-params (generated-params)="photoParamsHandler($event)"> </photo-params>
    			`,
    styles: ['.params {background: yellow}'],
    directives: [PhotoParameterDirective],
    encapsulation: ViewEncapsulation.None
})
export default class PhotoParametersComponent {
   photoID: string;
   focus: number;
   zoom: number;
   pixels: number;
   
   constructor(params: RouteParams){
        this.photoID = params.get('photoId');
   }

   photoParamsHandler(event:IPhotoParamaters) {
        this.focus = ${event.focus};
        this.zoom = ${event.zoom};
        this.pixels = ${event.pixels};
    }
}
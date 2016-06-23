import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {PhotoGeneratorComponent} from './photo-generator';
import {PhotoProcessorComponent} from './photo-processor';
import {IPhoto} from './photo';

@Component({
    selector: 'photo-mediator',
    template: `
    <photo-generator (generate)="generatedPhotoHandler($event)"></photo-generator><br>
    <br/>
    <photo-processor [photo]="photo"></photo-processor>
  `,
    directives: [PhotoGeneratorComponent, PhotoProcessorComponent]

    ,changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PhotoMediatorComponent {
    photo: IPhoto;

    generatedPhotoHandler(event:IPhoto) {
        this.photo = event;
    }
}

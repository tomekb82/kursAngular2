import {Component, Inject} from 'angular2/core';
import {Control,
  ControlGroup,
  FormBuilder,
  Validators,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  FORM_PROVIDERS
} from 'angular2/common';
import 'rxjs/add/operator/debounceTime';
import LogDirective from '../../directives/logging';
import {PhotoService} from '../../services/photo-service';
import {ValidationService} from '../../services/validation-service';
import {SearchProcessorComponent} from './search-processor';

import {Kw} from '../../kontrolki/kw';

@Component({
  selector: 'photo-search',
  providers: [FORM_PROVIDERS],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, LogDirective, SearchProcessorComponent],
  template: require('./search.html'),
  styles: ['.textarea {height: 100px; width: 220px;}']
})
export default class SearchComponent {
  formModel: ControlGroup;

	categories: string[];
  placeCtrl: Control;
  searchYear:number;

	searchTitle: string = '';
	searchPlace: string = 'Warszawa';

	searchTextarea: string = ""

  photoTitle: string;
  photoYear: number;

  onSelectEvent({target}):void{
    this.searchPlace=target.value;
  }

  onInputSearchTitleEvent(event: Event): void {
   	let inputElement: HTMLInputElement = <HTMLInputElement> event.target;

   	this.searchTextarea = "The input property value = " + inputElement.value;
   	this.searchTextarea += "\nThe input attribute value =" + inputElement.getAttribute('value');
   	this.searchTextarea += "\nThe title property value =" + this.searchTitle;
  }

	constructor(@Inject('IS_DEV_ENVIRONMENT') private isDev: boolean, 
      private photoService: PhotoService,
      private fb: FormBuilder,
      private kw:Kw) {


console.log(this.kw.pokaz());
    this.categories = this.photoService.getCategories();
    
    this.placeCtrl = new Control('');
    this.placeCtrl.valueChanges
      .debounceTime(500)
      .subscribe(place => this.getYearFromServer(place));

    this.formModel = fb.group({
      'title': [null, Validators.minLength(3)],
      'year': [null, ValidationService.positiveNumberValidator],
      'place': this.placeCtrl,
      'category': [-1]
    })

    
  }

  onSearch() {
    if (this.formModel.valid) {
      this.photoService.emitSearchEvent(this.formModel.value);
    }else{
      console.log("onSearch, form invalid");
    }
  }

  getYearFromServer(place) {
        this.searchYear =  2014;//12*Math.random().toFixed(4);
        console.log(`The year for the ${place} is:` + this.searchYear );
  }


  getPhoto(formValue){
      this.photoService.getPhoto(formValue.photoID)
        .subscribe(
            data => {
              this.photoTitle = data.title;
              this.photoYear = data.year;
            },
            err => console.log("Can't get photo details. Error code: %s, URL: %s ",  err.status, err.url),
            () =>    console.log( 'Done')
        );
  }
    
}

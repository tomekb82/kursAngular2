import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';

interface IChanges {[key: string]: SimpleChange};

@Component({
    selector: 'search-processor',
    template: `
    Photo place (2 way data binding):  {{place}} 
    <div>Message: {{message}}''</div>
  `,
    styles:[`:host {background: cyan;}`]
})
export class SearchProcessorComponent implements OnChanges {

  @Input('year') year: number;
  //  @Input('place') place: string;

  private _place: string;

  @Input('place')
  set setPlace(value: string) {
    this._place = value;
  }

  get place(): string {
    return this._place;
  }

  message: string = 'Initial message';

  /** place isn't initialized yet */
  constructor() {
    console.log(`constructor: ${this.place}`);
  }

  /** Invoked every time an @Input() property changes via the data binding */
  ngOnChanges() {
    console.log(`ngOnChanges: ${this.place}`);
  }

  /* On Changes with params */
  ngOnChanges(changes: IChanges) {
    this.message = JSON.stringify(changes, null, 2);
  }

  /**
   * Invoked after very first ngOnChanges(). It's used if you want to
     use the values from component's properties, which are not available in the constructor.
   */
  ngOnInit() {
    console.log(`ngOnInit: ${this.place}`);
  }
}
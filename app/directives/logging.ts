import {Directive} from 'angular2/core';

@Directive({
  selector: 'input[log-directive]',
  host: {
    '(input)': 'onInput($event)'
  }
})
export default class LogDirective {
  onInput(event) {
    console.log(event.target.value);
  }
}

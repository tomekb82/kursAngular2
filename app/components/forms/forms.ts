import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'photo-form',
  directives: [FORM_DIRECTIVES],
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
      <div>Username:         <input type="text" ngControl="username"></div>
      <div>SSN:              <input type="text" ngControl="ssn"></div>
      <div>Password:         <input type="password" ngControl="password"></div>
      <div>Confirm password: <input type="password" ngControl="pconfirm"></div>
      <button type="submit">Register</button>
    </form>
  `
})
export default class FormsComponent {
  onSubmit(formData) {
    console.log(formData);
  }
}
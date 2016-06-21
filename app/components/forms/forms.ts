import {Component} from 'angular2/core';
import {
  Control,
  ControlArray,
  ControlGroup,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES
} from 'angular2/common';



function peselValidator(control: Control): {[key: string]: any} {
  const value: string = control.value || '';
  const valid = value.match(/^\d{11}$/);
  return valid ? null : {pesel: true};
}

@Component({
  selector: 'photo-form',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: 
  ` <h4>Template-driven:</h4>
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
      <div>Username:         <input type="text" ngControl="username"></div>
      <div>SSN:              <input type="text" ngControl="ssn"></div>
      <div>Password:         <input type="password" ngControl="password"></div>
      <div>Confirm password: <input type="password" ngControl="pconfirm"></div>
      <button type="submit">Register</button>
    </form>

	<hr>
    <h4>Data-driven:</h4>
    <form [ngFormModel]="form" (ngSubmit)="register()">
      <div>
        <label for="username">Username</label>
        <input id="username" type="text" ngControl="username">
      </div>

	  <div>
        <label for="pesel">PESEL</label>
      	<input id="pesel" type="text" ngControl="peselCtrl">
        <span [hidden]="!form.hasError('pesel', 'peselCtrl')">PESEL in invalid</span>
	  </div>

      <div>
        <label>Emails</label>
        <ul ngControlGroup="emails">
          <li *ngFor="#e of emails; #i = index"><input ngControl="{{i}}"></li>
        </ul>
        <button type="button" (click)="addEmail()">Add Email</button>
      </div>
      <button type="submit">Register</button>
    </form>
    <label>Form Value:</label>
    <pre>{{value}}</pre>

  `
})
export default class FormsComponent {
  onSubmit(formData) {
    console.log(formData);
  }

  form: ControlGroup;
  emails: Control[];
  peselCtrl: Control;

  constructor() {
    this.emails = [new Control()];

    this.form = new ControlGroup({
      username: new Control(),
      emails: new ControlArray(this.emails),
      peselCtrl: new Control('', peselValidator)
    });
  }

  get value() {
    return JSON.stringify(this.form.value, null, 4);
  }

  addEmail() {
    const emails = <ControlArray>this.form.controls['emails'];
    emails.push(new Control());
  }

  register() {
    console.log(this.form.value);
  }
}
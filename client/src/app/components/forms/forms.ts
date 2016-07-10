import {Component ,Directive, provide} from 'angular2/core';
import {
  Control,
  ControlArray,
  ControlGroup,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  NG_VALIDATORS,
  Validators,
  FormBuilder	
} from 'angular2/common';

import {ValidationService} from '../../services/validation-service';
import {ControlMessages } from './control-messages';


/**
 * Returns `true` if all Controls in the specified ControlGroup have exactly
 * the same value. Otherwise returns `false`.
 */
function equalValidator({value}: ControlGroup): {[key: string]: any} {
  const [first, ...rest] = Object.keys(value || {});
  const valid = rest.every(v => value[v] === value[first]);
  return valid ? null : {equal: true};
}

/**
 * Wraps existing {@link equalValidator} function into a directive,
 * so it can be used in a template to validate a form field.
 */
@Directive({
  selector: '[equal]',
  providers: [provide(NG_VALIDATORS, {useValue: equalValidator, multi: true})]
})
class EqualValidatorDirective {}


function emailValidator(control: Control): {[key: string]: any} {
  const value: string = control.value || '';
  const valid = value.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
  return valid ? null : {email: true};
}

/**
 * Wraps existing {@link emailValidator} function into a directive,
 * so it can be used in a template to validate a form field.
 */
@Directive({
  selector: '[email]',
  providers: [provide(NG_VALIDATORS, {useValue: emailValidator, multi: true})]
})
class EmailValidatorDirective {}

@Component({
  selector: 'photo-form',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, 
  	EmailValidatorDirective, 
  	EqualValidatorDirective, 
  	ControlMessages],
  templateUrl: 'app/components/forms/forms.html',
  styleUrls: ['app/components/forms/forms.css'], // <4>
})
export default class FormsComponent {
  onSubmit(formValue: any, isFormValid: boolean) {
    if (isFormValid) {
      console.log(formValue);
    }
  }

  formModel: ControlGroup;
  emailsModel: Control[];
  peselCtrlModel: Control;

  constructor(private fb: FormBuilder) {
  	this.emailsModel = [new Control('')];

   /* this.formModel = new ControlGroup({
      'usernameModel': new Control('', Validators.required),
      'emailsModel': new ControlArray(this.emailsModel),
      'peselCtrlModel': new Control('', peselValidator),
      'passwordsGroupModel': new ControlGroup({
        'passwordModel': new Control('', Validators.minLength(5)),
        'pconfirmModel': new Control('')
      }, {}, equalValidator)
    });*/

    /* Form builder */
    //const fb = new FormBuilder();
    this.formModel = fb.group({
      'usernameModel': ['', Validators.required],
      'emailsModel': new ControlArray(this.emailsModel),
      'peselCtrlModel': ['', 
      	Validators.compose([Validators.required/*, ValidationService.peselValidator*/]), 
      	ValidationService.asyncPeselValidator],
      'passwordsGroupModel': fb.group({
        'passwordModel': ['', Validators.minLength(5)],
        'pconfirmModel': ['']
      }, {validator: equalValidator})
    });
  }

  get value() {
    return JSON.stringify(this.formModel.value, null, 4);
  }

  addEmail() {
    const emailsModel = <ControlArray>this.formModel.controls['emailsModel'];
    emailsModel.push(new Control(''));
  }

  register() {
  	if (this.formModel.dirty && this.formModel.valid) {
      console.log(this.formModel.value);
    }
  }
}
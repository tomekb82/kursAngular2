import { Control} from 'angular2/common';
import * as Rx from 'rxjs/Rx';


export class ValidationService {

  static positiveNumberValidator(control: Control): any {
    if (!control.value) return null;
    const price = parseInt(control.value);
    return price === null ||
      typeof price === 'number' &&
      price > 0 ? null : {positivenumber: true};
  }

  static peselValidator(control: Control): {[key: string]: any} {
  		const value: string = control.value || '';
  		const valid = value.match(/^\d{11}$/);
  		return valid ? null : {pesel: true};
	}

/**
 * Returns an Observable resolved with either a null or an error object.
 */
static asyncPeselValidator(control: Control): Rx.Observable {
  const value: string = control.value || '';
  const valid = value.match(/^\d{11}$/);
  return Rx.Observable
      .of(valid ? null : {pesel: true})
      .delay(5000);
}

  static getValidatorErrorMessage(code: string) {
    let config = {
      'required': 'Required',
      'pesel': 'PESEL in invalid'
    };
    return config[code];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }
     
  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
        return { 'invalidEmailAddress': true };
      }
    }
     
   static passwordValidator(control) {
     // {6,100}           - Assert password is between 6 and 100 characters
     // (?=.*[0-9])       - Assert a string has at least one number
     if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
       return null;
     } else {
       return { 'invalidPassword': true };
     }
  }
}



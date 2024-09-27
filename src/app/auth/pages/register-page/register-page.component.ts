import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as customValidators from '../../../shared/validators/validators.functions';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern) ]],
    email: ['', [ Validators.required,  Validators.pattern(customValidators.emailPattern) ]],
    username: ['', [ Validators.required, customValidators.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor ( private fb: FormBuilder ) {};

  isValidField( field: string ){
    // TODO: obtener validación desde un servicio
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  } 
}

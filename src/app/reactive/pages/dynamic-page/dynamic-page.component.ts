import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group ({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    favouriteGames: this.fb.array([ 
      ['Metal Gear', Validators.required],
      ['Mario Bross', Validators.required]
    ]),
  });

  public newFavourite: FormControl = new FormControl('', Validators.required);

  constructor ( private fb: FormBuilder) {}

  get favouriteGames() {
    return this.myForm.get('favouriteGames') as FormArray;
  }

  isValidFieldInArray( formArray: FormArray, i: number) {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case 'required':
            return 'Este cammpo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} characters.`;
      }
    }

    return null;
  }

  onAddToFavourites(): void {
    if ( this.newFavourite.invalid ) return;

    const newGame = this.newFavourite.value;

    // Se usa en caso de no usar el FormBuilder
    // this.favouriteGames.push( new FormControl( newGame, Validators.required))

    this.favouriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavourite.reset();
    
    // console.log( this.newFavourite.value );
  } 

  onDeleteFavourite( index:number ): void {
    this.favouriteGames.removeAt(index);
  }

  onSubmit(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log( this.myForm.value );

    (this.myForm.controls['favouriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();
  }
}

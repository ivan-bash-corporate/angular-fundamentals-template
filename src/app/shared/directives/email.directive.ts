import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[emailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true,
        },
    ],
})

export class EmailValidatorDirective implements Validator {
    private emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    private invalidResult = { invalidEmail: true };

    public validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;

        if (!value) {
            return null;
        }

        return this.emailPattern.test(value) ? null : this.invalidResult;
    }
}

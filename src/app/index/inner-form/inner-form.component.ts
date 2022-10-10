import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
    Validators
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
    selector: 'app-inner-form',
    templateUrl: './inner-form.component.html',
    styleUrls: ['./inner-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: InnerFormComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: InnerFormComponent
        }
    ]
})
export class InnerFormComponent implements OnInit, ControlValueAccessor, Validator {
    public formGroup: FormGroup;

    constructor(_formBuilder: FormBuilder) {
        this.formGroup = _formBuilder.group({
            input1: [null, Validators.required],
            input2: [null, Validators.required],
        });
    }

    onChange = (value: any) => {
        this.onChange(value);
    };

    onTouched = () => {
        this.onTouched();
    };

    ngOnInit(): void {
        this.formGroup.valueChanges.pipe(
            untilDestroyed(this)
        ).subscribe(val => (
            this.onChange(val), this.onTouched()
        ));
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        this.formGroup.patchValue(obj);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.formGroup.invalid) {
            return Object.entries(this.formGroup.controls).reduce((errors, [controlName, control]) => {
                if (control.errors) {
                    return {
                        ...(errors || {}),
                        [controlName]: control.errors
                    };
                }
                return errors;
            }, null as ValidationErrors | null);
        }

        return null;
    }
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgForm,
    ValidationErrors,
    Validator,
    Validators
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DictionaryFormModel } from '../../models/dictionaryForm.model';
import { quotaExceedValidateFormArray } from '../../utils/form.validate';


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
    ],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class InnerFormComponent implements OnInit, ControlValueAccessor, Validator {
    public formGroup: FormGroup;

    @Input() radioList: any[] = [];
    @Input() financingList: any[] = [];

    constructor(private _formBuilder: FormBuilder) {
        this.formGroup = _formBuilder.group({
            input1: [null, Validators.required],
            input2: [null, Validators.required],
            radio: [],
            financing: this._formBuilder.array([])
        });

        this.financing.addValidators([quotaExceedValidateFormArray(100, 'quota')]);
    }

    public get inpit1() {
        return this.formGroup.controls['inpit1'] as FormControl;
    }

    public get inpit2() {
        return this.formGroup.controls['inpit2'] as FormControl;
    }

    public get radio() {
        return this.formGroup.controls['radio'] as FormControl;
    }

    public get financing() {
        return this.formGroup.controls['financing'] as FormArray;
    }

    onChange = (value: any) => {
        //this.onChange(value);
    };

    onTouched = () => {

    };

    ngOnInit(): void {
        this.formGroup.valueChanges.pipe(
            untilDestroyed(this)
        ).subscribe(val => (
            this.onChange(val), this.onTouched()
        ));

        this.financingList.forEach(value => {

            let financingFormGroup = new DictionaryFormModel(this._formBuilder).formGroup;
            financingFormGroup.patchValue(value.sourceOfFinancing);
            const financingGroup = this._formBuilder.group({
                title: [value.title],
                quota: [value.quota],
                sourceOfFinancing: financingFormGroup
            });
            this.financing.push(financingGroup);
        })

        this.financing.valueChanges.subscribe(value => this.financing.patchValue(value, {
            onlySelf: true,
            emitEvent: false
        }));
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        console.log('writeValue');
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

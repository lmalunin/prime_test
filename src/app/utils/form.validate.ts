import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';

export const markAllAsDirtyAndTouched = (controlsGroup: FormGroup): void => {
    Object.keys(controlsGroup.controls).forEach(field => {
        const control: any = controlsGroup.get(field);
        if (control.controls) {
            markAllAsDirtyAndTouched(control);
        } else {
            markAsDirtyAndTouched(control);
        }
    });
};

export const markAsDirtyAndTouched = (control: AbstractControl): void => {
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
};

export function customValidateArrayGroup(maxValue: number, fieldName: string): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: any } | null => {

        const controlArray = formArray as FormArray;
        let count = 0

        controlArray.controls.forEach((group: any) => {
            const formGroup = group as FormGroup;

            let value = formGroup.get(fieldName)?.value;

            count += value;
        })
        return count < maxValue ? null : { error: fieldName + 'ExeedError' };
    }
};
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class DictionaryFormModel {

    public formGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder) {
        this.formGroup = _formBuilder.group({
            code: [null],
            id: [null],
            name: [null],
            shortName: [null],
            type: [null],
            uuid: [null],
            nameCode: [null],
        })
    }

    get code() {
        return this.formGroup.controls["code"] as FormControl;
    }

    get id() {
        return this.formGroup.controls["id"] as FormControl;
    }

    get name() {
        return this.formGroup.controls["name"] as FormControl;
    }

    get shortName() {
        return this.formGroup.controls["shortName"] as FormControl;
    }

    get type() {
        return this.formGroup.controls["type"] as FormControl;
    }

    get uuid() {
        return this.formGroup.controls["uuid"] as FormControl;
    }

    get nameCode() {
        return this.formGroup.controls["nameCode"] as FormControl;
    }
}
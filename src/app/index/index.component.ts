import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import moment, { Moment } from 'moment';
import { markAllAsDirtyAndTouched } from '../utils/form.validate';
import Diff = moment.unitOfTime.Diff;

export class DateUtils {
    public static _calcYearsBetweenDates(beginDt: Date, endDt: Date, unitOfTime: Diff): any {
        if (beginDt && endDt) {
            const a: Moment = moment([beginDt.getFullYear(), beginDt.getMonth(), beginDt.getDate()]);
            const b: Moment = moment([endDt.getFullYear(), endDt.getMonth(), endDt.getDate()]);
            return b.diff(a, unitOfTime);
        }
        return null;
    }
}

export const dateCompare: (
    beginControlName: string,
    endControlName: string,
    error: { [key: string]: boolean },
    range: number,
    unitOfTime: Diff,
) => ValidatorFn = (beginControlName, endControlName, error, range, unitOfTime) => (c: AbstractControl): { [key: string]: boolean } | null => {
    const beginDate: Date = c.get(beginControlName)!.value;
    const endDate: Date = c.get(endControlName)!.value;
    const differenceInYearsTruncated: number = DateUtils._calcYearsBetweenDates(beginDate, endDate, unitOfTime);
    if ((beginDate !== null && endDate !== null) && differenceInYearsTruncated >= range) {
        return error;
    }
    return null;
};

const currentYear: number = new Date().getFullYear();

interface IDateRange {
    start: number;
    end: number;
}

export interface ICalendarRanges {
    documentDates: IDateRange;
    default: IDateRange;
    birthDates: IDateRange;
}

export const CALENDAR_CONFIG_RANGE: ICalendarRanges = {
    documentDates: {
        start: currentYear - 20,
        end: currentYear + 20,
    },
    default: {
        start: currentYear - 120,
        end: currentYear + 120,
    },
    birthDates: {
        start: currentYear - 120,
        end: currentYear,
    },
}

@UntilDestroy()
@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    public form: FormGroup;
    public calendarRanges: ICalendarRanges = CALENDAR_CONFIG_RANGE;
    public radioList: { id: number; name: string }[] =
        [
            { id: 1, name: "a1" },
            { id: 2, name: 'a2' },
            { id: 3, name: 'a3' }
        ];

    public financingList: Array<any> = [
        {
            title: 'Федеральный бюджет',
            sourceOfFinancing: {
                id: 3,
                uuid: null,
                code: '0100',
                name: 'Финансирование только за счет средств федерального бюджета',
                shortName: null,
            },
            quota: 0,
        },
        {
            title: 'Внебюджетные фонды',
            sourceOfFinancing: {
                id: 4,
                uuid: null,
                code: '1000',
                name: 'Финансирование только за счет средств Государственных внебюджетных фондов',
                shortName: null,
            },
            quota: 0,
        },
        {
            title: 'Региональный бюджет',
            sourceOfFinancing: {
                id: 2,
                uuid: null,
                code: '0010',
                name: 'Финансирование только за счет средств бюджета субъекта Российской Федерации',
                shortName: null,
            },
            quota: 0,
        },
        {
            title: 'Муниципальный бюджет',
            sourceOfFinancing: {
                id: 1,
                uuid: null,
                code: '0001',
                name: 'Финансирование только за счет средств бюджетов органов местного самоуправления',
                shortName: null,
            },
            quota: 0,
        },
    ];
    private readonly _recordsRangeValidator: ValidatorFn = dateCompare('beginDate', 'endDate', { invalidRecordsDatesRange: true }, 1, 'year');

    public get homeInput(): FormControl {
        return this.form.get('homeInput') as FormControl;
    }

    public get beginDate(): FormControl {
        return this.form.get('beginDate') as FormControl;
    }

    public get endDate(): FormControl {
        return this.form.get('endDate') as FormControl;
    }

    public get innerForm(): FormControl {
        return this.form.get('innerForm') as FormControl;
    }

    constructor(private readonly _formBuilder: FormBuilder,) {
        this.form = this._formBuilder.group({
            homeInput: ['a1', Validators.required],
            beginDate: [null, Validators.required],
            endDate: [null, Validators.required],
            innerForm: []
        }, { validators: this._recordsRangeValidator })
    }

    ngOnInit(): void {
        // this.beginDate.statusChanges.subscribe(console.log);
        // this.endDate.statusChanges.subscribe(console.log);

        console.log('ngOnInit');

        //this.financingList[1].quota = 10;

        //this.innerForm.patchValue({ radio: this.radioList[1], financing: this.financingList });
        this.form.statusChanges.pipe(
            untilDestroyed(this)
        ).subscribe(value => {
            console.log(value)
        })
    }

    submit() {

        markAllAsDirtyAndTouched(this.form);

        console.log(this.form.value);
        console.log(this.form.errors);
        console.log(this.form.status);
        console.log('inner.form', this.innerForm.status);
    }
}

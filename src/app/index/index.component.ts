import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import moment, { Moment } from 'moment';
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
    const beginDate: Date = c.get(beginControlName).value;
    const endDate: Date = c.get(endControlName).value;
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

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    public form: FormGroup;
    public calendarRanges: ICalendarRanges = CALENDAR_CONFIG_RANGE;
    private readonly _recordsRangeValidator: ValidatorFn = dateCompare('beginDate', 'endDate', { invalidRecordsDatesRange: true }, 1, 'year');

    constructor(private readonly _formBuilder: FormBuilder,) {
        this.form = this._formBuilder.group({
            beginDate: [],
            endDate: []
        }, { validators: this._recordsRangeValidator })
    }

    public get beginDate(): FormControl {
        return this.form.get('beginDate') as FormControl;
    }

    public get endDate(): FormControl {
        return this.form.get('endDate') as FormControl;
    }

    ngOnInit(): void {
        this.beginDate.statusChanges.subscribe(console.log);
        this.endDate.statusChanges.subscribe(console.log);
    }

}

import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

const INVALID_DATE = new Date('');

@Component({
  selector: 'date-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateInputComponent,
      multi: true,
    },
  ],
  template: `
    <div class="d-flex">
      <input
        nbInput
        fullWidth
        class="mr-1"
        style="max-width: 8rem;"
        [mask]="dateInputMask"
        [showMaskTyped]="true"
        [dropSpecialCharacters]="false"
        placeHolderCharacter=" "
        [formControl]="dateInputFormControl"
      />
      <input
        nbInput
        fullWidth
        style="max-width: 5rem;"
        [mask]="timeInputMask"
        [showMaskTyped]="true"
        [dropSpecialCharacters]="false"
        placeHolderCharacter=" "
        [formControl]="timeInputFormControl"
      />
    </div>
  `,
})
export class DateInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() public value: Date;

  public readonly dateInputFormControl = new FormControl();
  public readonly timeInputFormControl = new FormControl();
  public readonly dateInputMask = '0000/00/00';
  public readonly timeInputMask = '00:00';

  private onChanged: (date: Date) => any;
  private inputValueChangesSubscription: Subscription;

  public writeValue(value: Date | string): void {
    if (value instanceof Date && !isNaN(value.valueOf())) {
      this.value = value;
    } else {
      this.value = new Date(value);
    }

    const dateString = this.datePipe.transform(value, 'yyyy/MM/dd');
    this.dateInputFormControl.setValue(dateString);
    const timeString = this.datePipe.transform(value, 'HH:mm');
    this.timeInputFormControl.setValue(timeString);
  }

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {}

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.dateInputFormControl.disable();
      this.timeInputFormControl.disable();
    } else {
      this.dateInputFormControl.enable();
      this.timeInputFormControl.enable();
    }
  }

  constructor(private readonly datePipe: DatePipe) {}

  public ngAfterViewInit(): void {
    combineLatest(
      this.dateInputFormControl.valueChanges.pipe(startWith('')),
      this.timeInputFormControl.valueChanges.pipe(startWith('')),
    ).subscribe(([dateInputValue, timeInputValue]: [string | null, string | null]) => {
      if (!dateInputValue && !timeInputValue) {
        this.onChanged(null);
      } else if (
        dateInputValue.length !== this.dateInputMask.length ||
        (timeInputValue && timeInputValue.length !== this.timeInputMask.length)
      ) {
        this.onChanged(INVALID_DATE);
      } else {
        const output = this.createOutput(dateInputValue, timeInputValue);
        this.onChanged(output);
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.inputValueChangesSubscription) {
      this.inputValueChangesSubscription.unsubscribe();
    }
  }

  private createOutput(date?: string, time?: string): Date {
    const dateValue = date || this.dateInputFormControl.value;
    const timeValue = time || this.timeInputFormControl.value || '00:00';
    return new Date(`${dateValue} ${timeValue}`);
  }
}

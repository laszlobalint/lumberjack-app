import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

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
    <input
      nbInput
      fullWidth
      id="inputDeliveryDate"
      [mask]="mask"
      [showMaskTyped]="true"
      [dropSpecialCharacters]="false"
      placeHolderCharacter=" "
      [formControl]="inputFormControl"
    />
  `,
})
export class DateInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() public value: Date;

  public readonly inputFormControl = new FormControl();
  public readonly mask = '0000/00/00 00:00';

  private onChanged: (date: Date) => any;
  private inputValueChangesSubscription: Subscription;

  writeValue(value: Date | string): void {
    if (value instanceof Date && !isNaN(value.valueOf())) {
      this.value = value;
    } else {
      this.value = new Date(value);
    }

    const dateString = this.datePipe.transform(value, 'yyyy/MM/dd HH:mm');
    this.inputFormControl.setValue(dateString);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  constructor(private readonly datePipe: DatePipe) {}

  public ngAfterViewInit() {
    this.inputFormControl.valueChanges.subscribe(value => {
      if (value.length !== this.mask.length) {
        this.onChanged(null);
      } else {
        this.onChanged(new Date(value));
      }
    });
  }

  public ngOnDestroy() {
    if (this.inputValueChangesSubscription) {
      this.inputValueChangesSubscription.unsubscribe();
    }
  }
}

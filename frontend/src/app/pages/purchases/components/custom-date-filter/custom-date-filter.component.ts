import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbCalendarRange } from '@nebular/theme';
import { DefaultFilter } from 'ng2-smart-table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'custom-date-filter',
  template: `
    <input
      nbInput
      class="form-control bg-white"
      [nbDatepicker]="formpicker"
      [formControl]="rangePickerFormControl"
      placeholder="Pick Date Range"
    />
    <nb-rangepicker #formpicker></nb-rangepicker>
  `,
  styles: [
    `
      custom-date-filter input {
        border-color: #ced4da !important;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CustomDateFilterComponent extends DefaultFilter implements OnInit, OnChanges {
  rangePickerFormControl = new FormControl();

  ngOnInit() {
    this.rangePickerFormControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(this.delay))
      .subscribe((range: NbCalendarRange<Date>) => {
        this.query = [range.start, range.end] as any;
        this.setFilter();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query && !this.query) {
      this.rangePickerFormControl.reset();
    }
  }
}

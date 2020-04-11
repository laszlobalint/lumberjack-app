import { Component, EventEmitter, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { CustomBooleanViewComponent } from './custom-boolean-view.component';

export interface CustomBooleanViewCheckedEvent<T> {
  rowData: T;
  checked: boolean;
}

@Component({
  selector: 'custom-boolean-view',
  template: '<nb-checkbox [value]="renderValue" (checkedChange)="onCheckedChange($event)"></nb-checkbox>',
})
export class CustomBooleanEditableViewComponent<T> extends CustomBooleanViewComponent implements ViewCell, OnInit {
  public checkedChange = new EventEmitter<CustomBooleanViewCheckedEvent<T>>();

  public onCheckedChange(checked: boolean): void {
    this.checkedChange.emit({ rowData: this.rowData, checked });
  }
}

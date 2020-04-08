import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

export interface CustomBooleanViewCheckedEvent<T> {
  rowData: T;
  checked: boolean;
}

@Component({
  selector: 'custom-boolean-view',
  template: '<nb-checkbox [value]="renderValue" (checkedChange)="onCheckedChange($event)"></nb-checkbox>',
})
export class CustomBooleanViewComponent<T> implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: T;

  public renderValue = false;
  public checkedChange = new EventEmitter<CustomBooleanViewCheckedEvent<T>>();

  public ngOnInit(): void {
    this.renderValue = Boolean(this.value);
  }

  public onCheckedChange(checked: boolean) {
    this.checkedChange.emit({ rowData: this.rowData, checked });
  }
}

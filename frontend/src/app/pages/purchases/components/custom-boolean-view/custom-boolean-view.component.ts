import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'custom-boolean-view',
  template: `
    <nb-icon *ngIf="renderValue" icon="checkmark-outline"></nb-icon>
    <nb-icon *ngIf="!renderValue" icon="close-outline"></nb-icon>
  `,
})
export class CustomBooleanViewComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  public renderValue = false;

  public ngOnInit(): void {
    this.renderValue = Boolean(this.value);
  }
}

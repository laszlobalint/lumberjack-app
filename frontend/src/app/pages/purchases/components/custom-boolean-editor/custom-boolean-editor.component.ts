import { AfterViewInit, Component } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'custom-boolean-editor',
  template: '<nb-checkbox [(ngModel)]="value" (checkedChange)="onCheckedChange($event)"></nb-checkbox>',
})
export class CustomBooleanEditorComponent extends DefaultEditor implements AfterViewInit {
  value = false;

  ngAfterViewInit(): void {
    this.value = this.cell.getValue();
  }

  onCheckedChange(checked: boolean) {
    this.cell.newValue = checked;
  }
}

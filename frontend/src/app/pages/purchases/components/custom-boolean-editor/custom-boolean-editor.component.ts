import { AfterViewInit, Component } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'custom-boolean-editor',
  template: '<nb-checkbox [(ngModel)]="value" (checkedChange)="onCheckedChange($event)"></nb-checkbox>',
})
export class CustomBooleanEditorComponent extends DefaultEditor implements AfterViewInit {
  public value = false;

  public ngAfterViewInit(): void {
    this.value = this.cell.getValue();
  }

  public onCheckedChange(checked: boolean): void {
    this.cell.newValue = checked;
  }
}

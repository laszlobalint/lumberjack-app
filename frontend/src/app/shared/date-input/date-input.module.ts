import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { NgxMaskModule } from 'ngx-mask';
import { DateInputComponent } from './date-input.component';

@NgModule({
  declarations: [DateInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NbInputModule, NgxMaskModule.forRoot()],
  exports: [DateInputComponent],
})
export class DateInputModule {}

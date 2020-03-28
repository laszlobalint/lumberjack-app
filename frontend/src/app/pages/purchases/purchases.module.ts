import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PurchasesComponent } from './components/purchases.component';

@NgModule({
  declarations: [PurchasesComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: PurchasesComponent }])],
})
export class PurchasesModule {}

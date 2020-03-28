import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ThemeModule } from '../../@theme/theme.module';

import { purchasesFeatureKey, reducer } from './store';
import { CreatePurchaseEffects } from './store/create-purchase.effects';
import { CreatePurchaseComponent } from './components/create-purchase.component';

@NgModule({
  declarations: [CreatePurchaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CreatePurchaseComponent }]),
    StoreModule.forFeature(purchasesFeatureKey, reducer),
    EffectsModule.forFeature([CreatePurchaseEffects]),
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbToggleModule,
    NbSpinnerModule,
    NbTooltipModule,
  ],
})
export class CreatePurchaseModule {}

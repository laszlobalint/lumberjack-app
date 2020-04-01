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
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DateInputModule } from '../../shared/date-input/date-input.module';
import { CreatePurchaseComponent } from './components/create-purchase.component';
import { createPurchasesFeatureKey, reducer } from './store';
import { CreatePurchaseEffects } from './store/create-purchase.effects';

@NgModule({
  declarations: [CreatePurchaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CreatePurchaseComponent }]),
    StoreModule.forFeature(createPurchasesFeatureKey, reducer),
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
    TranslateModule,
    DateInputModule,
  ],
})
export class CreatePurchaseModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
  NbUserModule,
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ThemeModule } from '../../@theme/theme.module';
import { CreatePurchaseComponent } from './components/create-purchase/create-purchase.component';
import { PurchasesComponent } from './components/purchases.component';
import { PurchasesService } from './services/purchases.service';
import { CreatePurchaseEffects } from './store/effects/create-purchase.effects';
import { purchasesFeatureKey, reducers } from './store/purchases.reducer';

const routes: Routes = [
  {
    path: '',
    component: PurchasesComponent,
    children: [
      { path: '', redirectTo: 'create' },
      { path: 'create', component: CreatePurchaseComponent },
    ],
  },
];

@NgModule({
  declarations: [PurchasesComponent, CreatePurchaseComponent],
  providers: [PurchasesService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(purchasesFeatureKey, reducers),
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
  ],
})
export class PurchasesModule {}

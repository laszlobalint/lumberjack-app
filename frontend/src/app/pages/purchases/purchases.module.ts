import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from './../../@theme/theme.module';
import { CustomBooleanEditorComponent } from './components/custom-boolean-editor/custom-boolean-editor.component';
import { PurchasesComponent } from './components/purchases.component';
import { purchasesFeatureKey, reducer } from './store';
import { PurchasesEffects } from './store/purchases.effects';

@NgModule({
  declarations: [PurchasesComponent, CustomBooleanEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PurchasesComponent }]),
    StoreModule.forFeature(purchasesFeatureKey, reducer),
    EffectsModule.forFeature([PurchasesEffects]),
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbCheckboxModule,
    FormsModule,
  ],
  entryComponents: [CustomBooleanEditorComponent],
})
export class PurchasesModule {}

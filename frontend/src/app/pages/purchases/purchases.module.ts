import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from './../../@theme/theme.module';
import { CustomBooleanEditorComponent } from './components/custom-boolean-editor/custom-boolean-editor.component';
import { CustomBooleanEditableViewComponent } from './components/custom-boolean-view/custom-boolean-editable-view.component';
import { CustomBooleanViewComponent } from './components/custom-boolean-view/custom-boolean-view.component';
import { CustomDateFilterComponent } from './components/custom-date-filter/custom-date-filter.component';
import { PurchasesComponent } from './components/purchases.component';
import { purchasesFeatureKey, reducer } from './store';
import { PurchasesEffects } from './store/purchases.effects';

@NgModule({
  declarations: [
    PurchasesComponent,
    CustomBooleanEditorComponent,
    CustomBooleanViewComponent,
    CustomBooleanEditableViewComponent,
    CustomDateFilterComponent,
  ],
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
    NbButtonModule,
    NbIconModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    TranslateModule,
  ],
  entryComponents: [
    CustomBooleanEditorComponent,
    CustomBooleanViewComponent,
    CustomBooleanEditableViewComponent,
    CustomDateFilterComponent,
  ],
})
export class PurchasesModule {}

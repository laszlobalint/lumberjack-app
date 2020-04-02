import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerEffects, customersFeatureKey, reducer } from './store';
import { ProductsService } from '../../services/products.service';
import { CustomersComponent } from './components/customers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CustomersComponent }]),
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    TranslateModule,
    StoreModule.forFeature(customersFeatureKey, reducer),
    EffectsModule.forFeature([CustomerEffects]),
  ],
  providers: [ProductsService, DatePipe, DecimalPipe],
  declarations: [CustomersComponent],
})
export class CustomersModule {}

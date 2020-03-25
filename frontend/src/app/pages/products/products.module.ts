import { ProductsComponent } from './components/products.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ProductsService } from './services/products.service';
import { ProductsEffects, reducer, productsFeatureKey } from './store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent }]),
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    StoreModule.forFeature(productsFeatureKey, reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [ProductsService, DatePipe, DecimalPipe],
  declarations: [ProductsComponent],
})
export class ProductsModule {}

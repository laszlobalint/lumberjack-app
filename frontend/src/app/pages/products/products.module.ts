import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsEffects, productsFeatureKey, reducer } from './store';
import { ProductsService } from '../../services/products.service';
import { ProductsComponent } from './components/products.component';

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
    TranslateModule,
    StoreModule.forFeature(productsFeatureKey, reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [ProductsService, DatePipe, DecimalPipe],
  declarations: [ProductsComponent],
})
export class ProductsModule {}

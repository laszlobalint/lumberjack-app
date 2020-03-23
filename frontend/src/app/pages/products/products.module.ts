import { ProductsComponent } from './components/products.component';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ProductsService } from './services/products.service';

@NgModule({
  imports: [CommonModule, NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule, ThemeModule, Ng2SmartTableModule],
  providers: [ProductsService, DatePipe, DecimalPipe],
  declarations: [ProductsComponent],
})
export class ProductsModule {}

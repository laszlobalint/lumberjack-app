import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductsService } from './products.service';

@NgModule({
  imports: [CommonModule, NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule, ThemeModule, Ng2SmartTableModule],
  providers: [ProductsService],
  declarations: [ProductsComponent],
})
export class ProductsModule {}

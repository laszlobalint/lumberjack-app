import { NgModule } from '@angular/core';
import { NbMenuModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [PagesRoutingModule, ThemeModule, NbMenuModule, DashboardModule, NbSelectModule],
  declarations: [PagesComponent],
})
export class PagesModule {}

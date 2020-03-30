import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  imports: [NbCardModule, ThemeModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}

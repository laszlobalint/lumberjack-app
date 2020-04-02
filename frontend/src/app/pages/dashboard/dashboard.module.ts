import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  imports: [NbCardModule, ThemeModule, TranslateModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}

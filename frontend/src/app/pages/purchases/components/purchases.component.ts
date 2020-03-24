import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'purchases',
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchasesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

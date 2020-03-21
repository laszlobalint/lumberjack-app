import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span></span>
    <div class="subtitle">{{ today | date: "yyyy. MM. dd. HH:mm:ss" }}</div>
  `
})
export class FooterComponent {
  today = new Date();

  constructor() {
    setInterval(() => {
      this.today = new Date();
    }, 500);
  }
}

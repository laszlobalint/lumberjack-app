import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-purchase',
  templateUrl: './create-purchase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePurchaseComponent implements OnInit {
  form: FormGroup;

  selectedProduct;
  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({});
  }

  ngOnInit() {}
}

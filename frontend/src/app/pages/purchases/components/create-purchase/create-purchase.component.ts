import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductDto } from '../../../products/product.model';
import * as fromPurchases from '../../store';

@Component({
  selector: 'create-purchase',
  templateUrl: './create-purchase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePurchaseComponent implements OnInit {
  form: FormGroup;
  enableCustomerEdit: boolean;
  productOptions: ProductDto[];

  constructor(private readonly purchaseStore: Store<fromPurchases.State>, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      amount: ['', Validators.required],
      productId: ['', Validators.required],
      price: ['', Validators.required],
      customerId: [''],
      customer: formBuilder.group({
        address: [''],
        phone: [''],
        companyName: [''],
        taxId: [''],
        checkingAccount: [''],
        description: [''],
      }),
      description: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    const createPurchase = this.form.value;
    this.purchaseStore.dispatch(fromPurchases.PostPurchase({ createPurchase }));
  }
}

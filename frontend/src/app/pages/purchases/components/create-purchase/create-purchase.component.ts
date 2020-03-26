import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerDto, ProductDto } from '../../../../models';
import * as fromPurchases from '../../store';

@Component({
  selector: 'create-purchase',
  templateUrl: './create-purchase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePurchaseComponent implements OnInit {
  form: FormGroup;
  enableCustomerEdit: boolean;
  products$: Observable<ProductDto[]>;
  customers$: Observable<CustomerDto[]>;

  constructor(private readonly purchaseStore: Store<fromPurchases.State>, formBuilder: FormBuilder) {
    this.customers$ = this.purchaseStore.select('purchases').pipe(map(state => state.createPurchase.customers));
    this.products$ = this.purchaseStore.select('purchases').pipe(map(state => state.createPurchase.products));

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

  ngOnInit() {
    this.purchaseStore.dispatch(fromPurchases.GetProducts());
    this.purchaseStore.dispatch(fromPurchases.GetCustomers());
  }

  onSubmit() {
    const createPurchase = this.form.value;
    this.purchaseStore.dispatch(fromPurchases.PostPurchase({ createPurchase }));
  }
}

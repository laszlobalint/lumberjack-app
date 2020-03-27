import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CustomerDto, ProductDto } from '../../../../models';
import * as fromPurchases from '../../store';

@Component({
  selector: 'create-purchase',
  templateUrl: './create-purchase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePurchaseComponent implements OnInit {
  form: FormGroup;
  products$: Observable<ProductDto[]>;
  customers$: Observable<CustomerDto[]>;

  _enableCustomerEdit = false;
  set enableCustomerEdit(enable: boolean) {
    this._enableCustomerEdit = enable;
    this.toggleEnableCustomerFormGroup(enable);
  }

  get enableCustomerEdit() {
    return this._enableCustomerEdit;
  }

  constructor(private readonly purchaseStore: Store<fromPurchases.State>, formBuilder: FormBuilder) {
    this.customers$ = this.purchaseStore.select('purchases').pipe(map(state => state.createPurchase.customers));
    this.products$ = this.purchaseStore.select('purchases').pipe(map(state => state.createPurchase.products));

    this.form = formBuilder.group({
      amount: ['', Validators.required],
      productId: ['', Validators.required],
      price: ['', Validators.required],
      customerId: [''],
      customer: formBuilder.group({
        name: [''],
        address: [''],
        phone: [''],
        description: [''],
        companyName: [''],
        taxId: [''],
        nationalId: [''],
        checkingAccount: [''],
      }),
      description: [''],
    });
  }

  ngOnInit() {
    this.purchaseStore.dispatch(fromPurchases.GetProducts());
    this.purchaseStore.dispatch(fromPurchases.GetCustomers());

    this.form.get('customerId').valueChanges.subscribe(async value => {
      this.enableCustomerEdit = false;
      this.toggleEnableCustomerFormGroup(!value);

      const customerFormGroup = this.form.get('customer');
      if (value) {
        const { id, date, ...createCustomer } = await this.findCustomer(value);
        customerFormGroup.setValue(createCustomer);
      } else {
        const value = { ...customerFormGroup.value };
        Object.keys(value).forEach(key => (value[key] = ''));
        customerFormGroup.setValue(value);
      }
    });
  }

  onSubmit() {
    const createPurchase = this.form.value;
    this.purchaseStore.dispatch(fromPurchases.PostPurchase({ createPurchase }));
  }

  private toggleEnableCustomerFormGroup(enable: boolean) {
    const customerFormGroup = this.form.get('customer');
    if (enable) {
      customerFormGroup.enable();
    } else {
      customerFormGroup.disable();
    }
  }

  private async findCustomer(customerId: number) {
    const customers = await this.customers$.pipe(take(1)).toPromise();
    return customers.find(customer => customer.id === customerId);
  }
}

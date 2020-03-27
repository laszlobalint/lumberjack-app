import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CreateCustomerDto, CustomerDto, ProductDto, PurchaseDto } from '../../../../models';
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
  purchase$: Observable<PurchaseDto | undefined>;
  customPrice = true;
  isBusy$: Observable<boolean>;

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
    this.purchase$ = this.purchaseStore.select('purchases').pipe(map(state => state.createPurchase.purchase));
    this.isBusy$ = this.purchaseStore.select('purchases').pipe(map(state => state.createPurchase.isBusy));

    this.form = formBuilder.group(
      {
        amount: ['', Validators.required],
        productId: ['', Validators.required],
        price: [{ value: '', disabled: true }, Validators.required],
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
      },
      { validators: [this.customerValidator] },
    );
  }

  ngOnInit() {
    this.purchaseStore.dispatch(fromPurchases.GetProducts());
    this.purchaseStore.dispatch(fromPurchases.GetCustomers());
    this.form.get('productId').valueChanges.subscribe(this.handleProductIdChange.bind(this));
    this.form.get('customerId').valueChanges.subscribe(this.handleCustomerIdChange.bind(this));
  }

  onSubmit() {
    const createPurchase = this.form.value;
    this.purchaseStore.dispatch(fromPurchases.PostPurchase({ createPurchase }));
  }

  toggleEnableCustomPrice(enable: boolean) {
    const priceFormControl = this.form.get('price');
    enable ? priceFormControl.enable() : priceFormControl.disable();
  }

  private async handleCustomerIdChange(customerId: number) {
    this.enableCustomerEdit = false;
    this.toggleEnableCustomerFormGroup(!customerId);

    const customerFormGroup = this.form.get('customer');
    if (customerId) {
      const { id, date, ...createCustomer } = await this.findCustomer(customerId);
      customerFormGroup.setValue(createCustomer);
    } else {
      const value = { ...customerFormGroup.value };
      Object.keys(value).forEach(key => (value[key] = ''));
      customerFormGroup.setValue(value);
    }
  }

  private async handleProductIdChange(productId: number) {
    const priceFormControl = this.form.get('price');
    this.customPrice = false;

    this.toggleEnableCustomPrice(!productId);
    const product = await this.findProduct(productId);
    priceFormControl.setValue(product.price);
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

  private async findProduct(productId: number) {
    const products = await this.products$.pipe(take(1)).toPromise();
    return products.find(product => product.id === productId);
  }

  private customerValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const customerId: number = formGroup.get('customerId').value;
    const customer: CreateCustomerDto = formGroup.get('customer').value;

    if (customerId || customer.name || customer.address) return null;
    else {
      return { invalid: true };
    }
  }
}

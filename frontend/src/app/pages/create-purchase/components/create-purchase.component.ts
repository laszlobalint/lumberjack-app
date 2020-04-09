import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { CreateCustomerDto, CreatePurchaseDto, CustomerDto, ProductDto, PurchaseDto } from '../../../models';
import dateValidator from '../../../shared/date-input/validators/date.validator';
import * as fromPurchases from '../store';

@Component({
  selector: 'create-purchase',
  templateUrl: './create-purchase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePurchaseComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public products$: Observable<ProductDto[]>;
  public customers$: Observable<CustomerDto[]>;
  public purchase$: Observable<PurchaseDto | undefined>;
  public isBusy$: Observable<boolean>;
  public failed$: Observable<boolean>;
  public purchaseSubscription: Subscription;

  public _enableCustomerEdit = false;

  set enableCustomerEdit(enable: boolean) {
    this._enableCustomerEdit = enable;
    this.toggleEnableCustomerFormGroup(enable);
  }

  get enableCustomerEdit(): boolean {
    return this._enableCustomerEdit;
  }

  constructor(private readonly purchaseStore: Store<fromPurchases.State>, private readonly formBuilder: FormBuilder) {
    this.customers$ = this.purchaseStore.select('createPurchase').pipe(map(state => state.customers));
    this.products$ = this.purchaseStore.select('createPurchase').pipe(map(state => state.products));
    this.purchase$ = this.purchaseStore.select('createPurchase').pipe(map(state => state.purchase));
    this.isBusy$ = this.purchaseStore.select('createPurchase').pipe(map(state => state.isBusy));
    this.failed$ = this.purchaseStore.select('createPurchase').pipe(map(state => state.failed));

    this.form = this.formBuilder.group(
      {
        amount: ['', [Validators.required, Validators.min(1)], this.amountValidator.bind(this)],
        reduceStock: [true],
        productId: ['', Validators.required],
        price: ['', Validators.required],
        customerId: [''],
        customer: this.formBuilder.group({
          address: ['', Validators.required],
          name: [''],
          phone: ['', Validators.required],
          description: [''],
          companyName: [''],
          taxId: [''],
          nationalId: [''],
          checkingAccount: [''],
        }),
        description: [''],
        deliveryDate: [null, dateValidator],
      },
      { validators: [this.customerValidator] },
    );

    this.purchaseSubscription = this.purchase$
      .pipe(filter(purchase => !!purchase))
      .subscribe(
        ({
          amount,
          price,
          description,
          customer: { id: customerId, createdDate, ...customer },
          product: { id: productId },
          reduceStock,
          deliveryDate,
        }) =>
          this.form.setValue({
            amount,
            productId,
            price,
            customerId,
            customer,
            description,
            reduceStock,
            deliveryDate,
          } as CreatePurchaseDto),
      );
  }

  public ngOnInit(): void {
    this.fetchData();
    this.form.get('productId').valueChanges.subscribe(this.handleProductIdChange.bind(this));
    this.form.get('customerId').valueChanges.subscribe(this.handleCustomerIdChange.bind(this));
    this.purchase$.subscribe(purchase => {
      if (purchase) {
        this.form.disable();
      }
    });
  }

  public ngOnDestroy(): void {
    this.purchaseSubscription.unsubscribe();
  }

  public onSubmit(): void {
    const createPurchase = this.form.getRawValue();
    this.purchaseStore.dispatch(fromPurchases.PostPurchase({ createPurchase }));
  }

  public onClear(): void {
    this.form.reset(
      {
        amount: null,
        productId: null,
        price: null,
        customerId: null,
        customer: {
          address: '',
          name: '',
          checkingAccount: '',
          taxId: '',
          companyName: '',
          description: '',
          nationalId: '',
          phone: '',
        },
        description: '',
        reduceStock: true,
        deliveryDate: null,
      } as CreatePurchaseDto,
      { emitEvent: false },
    );
    this.form.enable();
    this.purchaseStore.dispatch(fromPurchases.ClearPurchase());
  }

  public fetchData(): void {
    this.purchaseStore.dispatch(fromPurchases.GetProducts());
    this.purchaseStore.dispatch(fromPurchases.GetCustomers());
  }

  private async handleCustomerIdChange(customerId: number): Promise<void> {
    this.enableCustomerEdit = false;
    this.toggleEnableCustomerFormGroup(!customerId);

    const customerFormGroup = this.form.get('customer');
    if (customerId) {
      const { id, createdDate, ...createCustomer } = await this.findCustomer(customerId);
      customerFormGroup.setValue(createCustomer);
    } else {
      customerFormGroup.reset();
    }
  }

  private async handleProductIdChange(productId: number): Promise<void> {
    const product = await this.findProduct(productId);
    this.form.get('price').setValue(product && product.price);
  }

  private toggleEnableCustomerFormGroup(enable: boolean): void {
    const customerFormGroup = this.form.get('customer');
    if (enable) {
      customerFormGroup.enable();
    } else {
      customerFormGroup.disable();
    }
  }

  private async findCustomer(customerId: number): Promise<CustomerDto> {
    const customers = await this.customers$.pipe(take(1)).toPromise();
    return customers.find(customer => customer.id === customerId);
  }

  private async findProduct(productId: number): Promise<ProductDto> {
    const products = await this.products$.pipe(take(1)).toPromise();
    return products.find(product => product.id === productId);
  }

  private customerValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const customerId: number = formGroup.get('customerId').value;
    const customer: CreateCustomerDto = formGroup.get('customer').value;
    if (customerId || customer.name || customer.address) return null;
    else return { invalid: true };
  }

  private async amountValidator(control: FormControl): Promise<{ [key: string]: any } | null> {
    const productId = control.parent.get('productId').value;
    if (productId === null) return null;

    const product = await this.findProduct(productId);
    if (product && product.amount < control.value) return { invalid: true };
    else return null;
  }
}

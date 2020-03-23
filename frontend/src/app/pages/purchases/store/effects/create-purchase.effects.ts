import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { PurchasesService } from '../../services/purchases.service';

@Injectable()
export class CreatePurchaseEffects {
  constructor(private readonly actions$: Actions, private readonly purchasesService: PurchasesService) {}
}

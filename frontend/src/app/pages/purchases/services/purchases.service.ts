import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreatePurchaseDto } from '../models/purchases.model';
import { API_URL } from './../../../constants';
import { PurchaseDto } from './../models/purchases.model';

@Injectable()
export class PurchasesService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  postPurchase(createPurchaseDto: CreatePurchaseDto) {
    return this.http.post<PurchaseDto>(`${this.apiUrl}/purchase`, createPurchaseDto);
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { API_URL } from '../../../constants';
import { Product } from '../models/products.model';

@Injectable()
export class ProductsService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  fetchAllProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/product`);
  }
}

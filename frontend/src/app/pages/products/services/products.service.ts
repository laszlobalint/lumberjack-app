import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../../constants';
import { Product, CreateProductDto, UpdateProductDto } from '../models/products.model';

@Injectable()
export class ProductsService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  fetchAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product`);
  }

  fetchOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  save(createProductDto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/product`, createProductDto);
  }

  update(id: string, updateProductDto: UpdateProductDto): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/product/${id}`, updateProductDto);
  }

  delete(id: string): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/product/${id}`);
  }
}

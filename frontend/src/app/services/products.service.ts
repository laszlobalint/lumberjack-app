import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../models/products.model';

@Injectable()
export class ProductsService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  fetchAll(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/product`);
  }

  fetchOne(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/product/${id}`);
  }

  save(createProductDto: CreateProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(`${this.apiUrl}/product`, createProductDto);
  }

  update(id: number, updateProductDto: UpdateProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.apiUrl}/product/${id}`, updateProductDto);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/product/${id}`);
  }
}

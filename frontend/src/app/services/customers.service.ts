import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { CreateCustomerDto, CustomerDto, UpdateCustomerDto } from '../models';

@Injectable()
export class CustomersService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  fetchAll(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${this.apiUrl}/customer`);
  }

  fetchOne(id: number): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`${this.apiUrl}/customer/${id}`);
  }

  save(createCustomerDto: CreateCustomerDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(`${this.apiUrl}/customer`, createCustomerDto);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto): Observable<CustomerDto> {
    return this.http.put<CustomerDto>(`${this.apiUrl}/customer/${id}`, updateCustomerDto);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/customer/${id}`);
  }
}

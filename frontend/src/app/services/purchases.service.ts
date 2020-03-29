import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { CreatePurchaseDto, PurchaseDto } from '../models/purchases.model';
import { UpdatePurchaseDto } from './../models/purchases.model';

@Injectable()
export class PurchasesService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  fetchAll(): Observable<PurchaseDto[]> {
    return this.http.get<PurchaseDto[]>(`${this.apiUrl}/purchase`);
  }

  fetchOne(id: number): Observable<PurchaseDto> {
    return this.http.get<PurchaseDto>(`${this.apiUrl}/purchase/${id}`);
  }

  save(createPurchaseDto: CreatePurchaseDto) {
    return this.http.post<PurchaseDto>(`${this.apiUrl}/purchase`, createPurchaseDto);
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto): Observable<PurchaseDto> {
    return this.http.put<PurchaseDto>(`${this.apiUrl}/purchase/${id}`, updatePurchaseDto);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/purchase/${id}`);
  }
}

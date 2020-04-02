import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { FeedDto } from '../models/feed.model';

@Injectable()
export class FeedService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  get(): Observable<FeedDto> {
    return this.http.get<FeedDto>(`${this.apiUrl}/feed`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.model';
import { API_URL } from '../../app.constants';

@Injectable()
export class AuthService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  getUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/auth/user`);
  }
}

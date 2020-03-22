import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../constants';
import { UserDto } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private readonly http: HttpClient) {}

  getUser() {
    return this.http.get<UserDto>(`${this.apiUrl}/auth/user`);
  }

  /* All other functionalities are handled by NbAuthService */
}

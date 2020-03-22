import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../constants';
import { UserDto } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(@Inject(API_URL) private readonly API_URL: string, private readonly http: HttpClient) {}

  getUser() {
    return this.http.get<UserDto>(`${this.API_URL}/auth/user`);
  }

  /* All other functionalities are handled by NbAuthService */
}

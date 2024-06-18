import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCredentials, UserResponseDto } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  public registerUser(userInfo: User): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}/sign-up`, userInfo);
  };

  public signin(userCredentials: UserCredentials): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}/login`, userCredentials)
  };
}

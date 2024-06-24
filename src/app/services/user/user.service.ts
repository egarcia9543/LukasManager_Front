import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCredentials, UserResponseDto } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.backUrl;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public registerUser(userInfo: User): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}sign-up`, userInfo);
  };

  public signin(userCredentials: UserCredentials): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}login`, userCredentials)
  };

  public logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

  public getUserInSession(): User {
    return JSON.parse(sessionStorage.getItem('user') ?? '');
  };

  public getUserInSessionId(): string {
    return this.getUserInSession()._id;
  }
}

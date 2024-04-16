import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string | null = null;

  constructor(private http: HttpClient) { }

  getUsername(): string | null {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiEndpoint + '/authenticate/login', { username, password }).pipe(
      map(response => {
        this.username = username;
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('expiration', response.expiration.toString());
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiration');
    this.username = null;
  }
}

interface LoginResponse {
  expiration: Date,
  token: string
}

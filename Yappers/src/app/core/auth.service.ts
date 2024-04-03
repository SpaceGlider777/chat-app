import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  userObservable: Observable<string | null> = this.user.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiEndpoint + '/authenticate/login', { username, password }).pipe(
      map(response => {
        localStorage.setItem('access_token', response.token);
        return response;
      })
    );
  }
}

interface LoginResponse {
  expiration: Date,
  token: string
}

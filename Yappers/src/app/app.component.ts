import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Yappers';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    const expiration = localStorage.getItem('expiration') ? new Date(localStorage.getItem('expiration')!) : null;
    const today = new Date();
    if (token && expiration && expiration >= today) {
      const decoded: any = jwtDecode(token);
      this.authService.setUsername(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    } else if (expiration && expiration < today) {
      this.authService.logout();
    }
  }
}

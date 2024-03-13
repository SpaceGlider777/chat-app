import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) public document: Document,
     public auth: AuthService,
     private userService: UserService
     ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userService.user = user
      }
    })
  }

  login() {
    this.auth.loginWithRedirect().subscribe(() => {
      this.auth.user$.subscribe(user => {
        this.userService.user = user
      })
    })
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.document.location.origin } }).subscribe(() => {
      this.userService.user = null
    })
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('snackbar') snackbar!: SnackbarComponent;
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { 

  }

  login(): void {
    const self = this;
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe({
      complete() {
        self.router.navigate(['/home']);
      },
      error() {
        self.snackbar.show();
      },
    });
  }

}

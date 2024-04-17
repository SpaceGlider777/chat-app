import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login(): void {
    const self = this;
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe({
      complete() {
        self.router.navigate(['/home']);
      },
      error() {
        self.snackBar.open('Incorrect username or password', 'CLOSE', {
          verticalPosition: 'top',
          duration: 3000
        });
      },
    });
  }

}

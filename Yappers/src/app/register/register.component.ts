import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  register(): void {
    const self = this;
    this.authService.register(this.registerForm.controls['username'].value!, this.registerForm.controls['email'].value!, this.registerForm.controls['password'].value!).subscribe({
      complete() {
        self.snackBar.open('Account successfully created', 'CLOSE', {
          verticalPosition: 'top',
          duration: 3000
        });
        self.router.navigate(['/login']);
      },
      error() {
        self.snackBar.open('An error occured while creating your account', 'CLOSE', {
          verticalPosition: 'top',
          duration: 3000
        });
      },
    });
  }

}

import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router,private snackBar: MatSnackBar) {}

  signUp(): void {
    const signUpData = {
      email: this.email,       
      password: this.password  
    };
  
    this.apiService.signUp( signUpData )
    .subscribe(response => {
      console.log('SignUp response:', response);
    }, error => {
      console.error('SignUp error:', error);
    });
  }

  // (login)
  login(): void {
    // Verifică dacă email și parolă sunt furnizate
    if (!this.email || !this.password) {
      console.error('Email and password are required.');
      return;
    }
    const loginData = {
      email: this.email,
      password: this.password
    };

  // Apelul către serviciul de autentificare
    this.apiService.login(loginData)
    .subscribe(response => {
      console.log('Login response:', response);
      this.snackBar.open('Login successful', 'Close', {
        duration: 3000, 
      });
    }, error => {
      console.error('Login error:', error);
      this.snackBar.open('Login failed', 'Close', {
        duration: 3000,
      });
    });
      }
    }

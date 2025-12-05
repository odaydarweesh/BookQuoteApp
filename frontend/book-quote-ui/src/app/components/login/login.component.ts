import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Login response:', response);
          console.log('Response type:', typeof response);
          console.log('Response keys:', Object.keys(response));
          console.log('Success value:', response.success);
          console.log('Token value:', response.token);

          if (response && response.success && response.token) {
            // token تم حفظه في AuthService (localStorage)
            this.router.navigate(['/books']);
          } else {
            this.errorMessage = response.message || 'Login failed. Please check your credentials.';
          }

          this.isLoading = false;
        },
        error: (error) => {
          console.error('Login error:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          this.errorMessage = 'Login error. Please check your credentials.';
          this.isLoading = false;
        }
      });
  }

}

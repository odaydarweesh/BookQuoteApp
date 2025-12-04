import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    username: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    errorMessage: string = '';
    successMessage: string = '';
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onRegister(): void {
        this.errorMessage = '';
        this.successMessage = '';

        if (!this.username || !this.email || !this.password || !this.confirmPassword) {
            this.errorMessage = 'Please fill in all fields.';
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match.';
            return;
        }

        if (this.password.length < 6) {
            this.errorMessage = 'Password must be at least 6 characters.';
            return;
        }

        this.isLoading = true;

        this.authService.register({
            username: this.username,
            email: this.email,
            password: this.password
        }).subscribe({
            next: () => {
                this.successMessage = 'Registration successful! Redirecting to login...';
                this.isLoading = false;
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            },
            error: (error: any) => {
                this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
                this.isLoading = false;
            }
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginInput } from '../../../core/models/auth-dto.model';

/**
 * Login Component
 * Presentation layer for user authentication
 * Uses NonNullableFormBuilder for strict typing
 */
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<{
    email: ReturnType<NonNullableFormBuilder['control']>;
    password: ReturnType<NonNullableFormBuilder['control']>;
    rememberMe: ReturnType<NonNullableFormBuilder['control']>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    protected authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      rememberMe: this.fb.control(false),
    });
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.getRawValue();
      
      const credentials: LoginInput = { email, password };
      
      this.authService.login(credentials).subscribe({
        next: () => {
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          
          // Navigate based on customer status
          if (this.authService.isPending()) {
            this.router.navigate(['/auth/pending-approval']);
          } else if (this.authService.isApproved()) {
            this.router.navigate(['/dashboard']);
          } else if (this.authService.isRejected()) {
            this.router.navigate(['/auth/rejected']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  clearError(): void {
    this.authService.clearError();
  }
}

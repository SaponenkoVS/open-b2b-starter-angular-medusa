import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MedusaAuthService } from '../../../core/services/medusa-auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: MedusaAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get loading() {
    return this.authService.loading();
  }

  get error() {
    return this.authService.error();
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      const result = await this.authService.login({ email, password }, rememberMe);

      if (result.success) {
        // Navigate based on customer status
        if (this.authService.isPending()) {
          this.router.navigate(['/auth/pending-approval']);
        } else if (this.authService.isApproved()) {
          this.router.navigate(['/dashboard']);
        } else if (this.authService.isRejected()) {
          this.router.navigate(['/auth/rejected']);
        }
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  clearError(): void {
    this.authService.clearError();
  }
}

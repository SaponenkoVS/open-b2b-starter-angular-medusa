import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { B2BRegisterInput } from '../../../core/models/auth-dto.model';

/**
 * Registration Component
 * B2B customer registration with company information
 * Uses NonNullableFormBuilder for strict typing
 */
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    protected authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // Personal Information
      firstName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control('', [Validators.required]),
      
      // Company Information
      companyName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      taxId: this.fb.control('', [Validators.required]),
      companyAddress: this.fb.control('', [Validators.required]),
      
      // Terms
      acceptTerms: this.fb.control(false, [Validators.requiredTrue]),
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      delete confirmPassword.errors!['passwordMismatch'];
      confirmPassword.updateValueAndValidity({ emitEvent: false });
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.getRawValue();
      
      const registerData: B2BRegisterInput = {
        email: formValue.email,
        password: formValue.password,
        first_name: formValue.firstName,
        last_name: formValue.lastName,
        phone: formValue.phone,
        company: {
          name: formValue.companyName,
          tax_id: formValue.taxId,
          address: formValue.companyAddress,
        },
      };

      this.authService.registerB2B(registerData).subscribe({
        next: () => {
          this.router.navigate(['/auth/pending-approval']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  clearError(): void {
    this.authService.clearError();
  }
}

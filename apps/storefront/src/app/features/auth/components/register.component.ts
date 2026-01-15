import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MedusaAuthService } from '../../../core/services/medusa-auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: MedusaAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      
      // Company Information
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      taxId: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      
      // Terms
      acceptTerms: [false, [Validators.requiredTrue]],
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

  get loading() {
    return this.authService.loading();
  }

  get error() {
    return this.authService.error();
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      
      const result = await this.authService.register({
        email: formValue.email,
        password: formValue.password,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        phone: formValue.phone,
        metadata: {
          companyName: formValue.companyName,
          taxId: formValue.taxId,
          companyAddress: formValue.companyAddress,
          status: 'pending',
        },
      });

      if (result.success) {
        this.router.navigate(['/auth/pending-approval']);
      }
    } else {
      Object.keys(this.registerForm.controls).forEach((key) => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }

  clearError(): void {
    this.authService.clearError();
  }
}

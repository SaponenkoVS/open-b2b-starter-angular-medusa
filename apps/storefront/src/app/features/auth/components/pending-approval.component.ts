import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedusaAuthService } from '../../../core/services/medusa-auth.service';

@Component({
  selector: 'app-pending-approval',
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div class="max-w-md w-full">
        <div class="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-200 text-center">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
            <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Waiting for Approval</h2>
          <p class="text-gray-600 mb-6">
            Your B2B account registration for <strong>{{ companyName() }}</strong> has been submitted and is pending admin approval.
          </p>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 class="text-sm font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Our team will review your application</li>
              <li>• You'll receive an email notification once approved</li>
              <li>• Approval typically takes 24-48 hours</li>
            </ul>
          </div>
          
          <p class="text-sm text-gray-500 mb-4">
            If you have any questions, please contact our support team.
          </p>
          
          <button (click)="logout()" class="text-sm text-blue-600 hover:text-blue-500 font-medium">
            Sign out
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PendingApprovalComponent {
  constructor(private authService: MedusaAuthService) {}

  companyName = this.authService.companyName;

  logout(): void {
    this.authService.logout();
  }
}

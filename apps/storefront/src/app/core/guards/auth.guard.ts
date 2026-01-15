import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { MedusaAuthService } from '../services/medusa-auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(MedusaAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Check if customer is pending approval
    if (authService.isPending()) {
      router.navigate(['/auth/pending-approval']);
      return false;
    }
    
    // Check if customer is rejected
    if (authService.isRejected()) {
      router.navigate(['/auth/rejected']);
      return false;
    }
    
    // Only approved customers can access protected routes
    return authService.isApproved();
  }

  router.navigate(['/auth/login']);
  return false;
};

export const guestGuard: CanActivateFn = () => {
  const authService = inject(MedusaAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.isPending()) {
      router.navigate(['/auth/pending-approval']);
    } else if (authService.isApproved()) {
      router.navigate(['/dashboard']);
    }
    return false;
  }

  return true;
};

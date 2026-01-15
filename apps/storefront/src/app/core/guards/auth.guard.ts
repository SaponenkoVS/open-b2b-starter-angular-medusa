import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

/**
 * Auth Guard: Protects routes requiring approved B2B customers
 * Checks if user is authenticated and approved
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
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

/**
 * Guest Guard: Redirects authenticated users away from auth pages
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
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

/**
 * B2B Auth Guard: Checks company approval status
 * This is the primary guard for B2B-specific routes
 */
export const b2bAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Check company status
  const companyStatus = authService.companyStatus();
  
  if (companyStatus !== 'approved') {
    router.navigate(['/auth/pending-approval']);
    return false;
  }

  return true;
};

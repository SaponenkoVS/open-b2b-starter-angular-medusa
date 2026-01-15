import { Route } from '@angular/router';
import { LoginComponent } from './features/auth/components/login.component';
import { RegisterComponent } from './features/auth/components/register.component';
import { PendingApprovalComponent } from './features/auth/components/pending-approval.component';
import { DashboardLayoutComponent } from './features/dashboard/components/dashboard-layout.component';
import { DashboardOverviewComponent } from './features/dashboard/components/dashboard-overview.component';
import { CompanyListComponent } from './components/company/company-list.component';
import { BulkOrderComponent } from './components/bulk-order/bulk-order.component';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Auth routes
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [guestGuard],
      },
      {
        path: 'pending-approval',
        component: PendingApprovalComponent,
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  
  // Dashboard routes (protected)
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardOverviewComponent },
      { path: 'orders', component: CompanyListComponent }, // Placeholder
      { path: 'products', component: CompanyListComponent }, // Placeholder
      { path: 'profile', component: CompanyListComponent }, // Placeholder
      { path: 'settings', component: CompanyListComponent }, // Placeholder
    ],
  },
  
  // Legacy routes (for backwards compatibility)
  { path: 'companies', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'bulk-order', component: BulkOrderComponent, canActivate: [authGuard] },
];

import { Route } from '@angular/router';
import { CompanyListComponent } from './components/company/company-list.component';
import { BulkOrderComponent } from './components/bulk-order/bulk-order.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/companies', pathMatch: 'full' },
  { path: 'companies', component: CompanyListComponent },
  { path: 'bulk-order', component: BulkOrderComponent },
];

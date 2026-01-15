import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent {
  sidebarOpen = true;

  constructor(protected authService: AuthService) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}

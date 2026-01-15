import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-overview',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome back, {{ authService.user()?.first_name }}!</h1>
        <p class="mt-2 text-gray-600">Here's what's happening with your account today.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Customer Group</p>
              <p class="mt-2 text-2xl font-bold text-gray-900">
                {{ authService.customerGroup()?.name || 'Standard' }}
              </p>
            </div>
            <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Company</p>
              <p class="mt-2 text-2xl font-bold text-gray-900">{{ authService.companyName() }}</p>
            </div>
            <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Account Status</p>
              <p class="mt-2 text-2xl font-bold text-green-600">Approved</p>
            </div>
            <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a routerLink="/dashboard/products" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <div>
                <p class="font-semibold text-gray-900">Browse Products</p>
                <p class="text-sm text-gray-500">View catalog</p>
              </div>
            </a>

            <a routerLink="/dashboard/orders" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <div>
                <p class="font-semibold text-gray-900">View Orders</p>
                <p class="text-sm text-gray-500">Order history</p>
              </div>
            </a>

            <a routerLink="/bulk-order" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <svg class="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <div>
                <p class="font-semibold text-gray-900">Bulk Order</p>
                <p class="text-sm text-gray-500">Quick ordering</p>
              </div>
            </a>

            <a routerLink="/dashboard/profile" class="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <svg class="w-8 h-8 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <div>
                <p class="font-semibold text-gray-900">Company Profile</p>
                <p class="text-sm text-gray-500">Manage details</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardOverviewComponent {
  constructor(protected authService: AuthService) {}
}

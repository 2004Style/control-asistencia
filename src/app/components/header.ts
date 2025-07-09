import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import HeaderSelector from './header-selector';
import { HasRoleDirective } from '../core/hasRole.directive';
import { User, UserRole } from '../auth/auth.dto';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="max-w-screen-lg mx-auto p-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">App Roles</h1>

        <nav class="flex space-x-4">
          <a
            [routerLinkActiveOptions]="{ exact: true }"
            routerLinkActive="text-indigo-600"
            routerLink="/"
            >Dashboard</a
          >

          <a
            *hasRole="[ 'ADMIN']"
            routerLinkActive="text-indigo-600"
            routerLink="/orders"
          >
            Ordenes
          </a>

          <a
            *hasRole="[ 'ADMIN']"
            routerLinkActive="text-indigo-600"
            routerLink="/reports"
          >
            Reportes
          </a>
          <a
            *hasRole="['ADMIN']"
            routerLinkActive="text-indigo-600"
            routerLink="/admin"
            >Admin</a
          >
        </nav>

        <app-header-selector
          *ngIf="currentUser()"
          (logout)="logout()"
          (userChanged)="selectedUser($event)"
          [currentUser]="currentUser()"
          [users]="users()"
        />
      </div>
    </header>
  `,
  imports: [
    RouterLink,
    HeaderSelector,
    RouterLinkActive,
    HasRoleDirective,
    NgIf,
  ],
})
export default class Header {
  private _authService = inject(AuthService);

  currentUser = toSignal(this._authService.currentUser$);

  users = signal<User[]>([]); // Assuming you have a way to get all users

  logout() {
    this._authService.logout();
  }

  selectedUser(user: User) {
    // This logic might need adjustment based on your app's flow
    // For now, it's commented out as direct user switching might not be desired.
    // this._authService.login(user.email);
  }

  hasRole(roles: UserRole[]) {
    const user = this.currentUser();
    if (!user) return false;
    return user.roles.some((role) => roles.includes(role));
  }
}

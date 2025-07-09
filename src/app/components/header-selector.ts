import { Component, input, output } from '@angular/core';
import { AuthResponseDtoTs, User } from '../auth/auth.dto';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header-selector',
  standalone: true,
  template: `
    <div class="flex items-center space-x-4">
      <span *ngIf="currentUser()"
        >Hola, {{ currentUser()?.person.firstName }}</span
      >
      <select
        #selector
        (change)="onUserChange($event)"
        class="p-2 rounded"
        *ngIf="users().length > 1"
      >
        <option *ngFor="let user of users()" [value]="user.id">
          {{ user.name }}
        </option>
      </select>
      <button (click)="logout.emit()">Logout</button>
    </div>
  `,
  imports: [NgIf, NgFor],
})
export default class HeaderSelector {
  currentUser = input.required<AuthResponseDtoTs | null>();
  users = input.required<User[]>();
  userChanged = output<User>();
  logout = output();

  onUserChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const userId = +selectElement.value;
    const user = this.users().find((u) => u.id === userId);
    if (user) {
      this.userChanged.emit(user);
    }
  }
}

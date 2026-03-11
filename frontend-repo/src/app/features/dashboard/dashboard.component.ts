import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
  <div class="container py-4">
    <div class="d-flex justify-content-between">
      <h3>Dashboard</h3>
      <button class="btn btn-outline-danger" (click)="auth.logout()">Logout</button>
    </div>
    <div class="card mt-3 p-3">
      <p><strong>User:</strong> {{ auth.user?.name }} ({{ auth.user?.role }})</p>
      <p><strong>Balance:</strong> {{ auth.user?.balance }}</p>
      <a routerLink="users" class="btn btn-sm btn-primary">Manage Users</a>
    </div>

    <div class="card mt-3 p-3">
      <h5>Statement</h5>
      <table class="table table-sm">
        <thead><tr><th>Type</th><th>Amount</th><th>Sender</th><th>Receiver</th><th>Time</th></tr></thead>
        <tbody>
          <tr *ngFor="let i of statement">
            <td>{{ i.type }}</td><td>{{ i.amount }}</td>
            <td>{{ i.senderId?.username || '-' }}</td><td>{{ i.receiverId?.username || '-' }}</td>
            <td>{{ i.createdAt | date:'medium' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-outlet></router-outlet>
  </div>`
})
export class DashboardComponent implements OnInit {
  statement: any[] = [];
  constructor(public auth: AuthService, private api: ApiService) {}
  ngOnInit() { this.api.statement().subscribe((res) => (this.statement = res.items)); }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card mt-3 p-3">
    <h5>Create Next-Level User</h5>
    <div class="row g-2">
      <div class="col"><input class="form-control" placeholder="Name" [(ngModel)]="name"></div>
      <div class="col"><input class="form-control" placeholder="Username" [(ngModel)]="username"></div>
      <div class="col"><input class="form-control" placeholder="Password" [(ngModel)]="password"></div>
      <div class="col-auto"><button class="btn btn-success" (click)="createUser()">Create</button></div>
    </div>

    <h5 class="mt-4">Next-Level Users</h5>
    <table class="table table-sm">
      <tr *ngFor="let u of users"><td>{{u.name}}</td><td>{{u.username}}</td><td>{{u.level}}</td></tr>
    </table>

    <h5 class="mt-4">Transfer Balance</h5>
    <div class="row g-2">
      <div class="col"><select class="form-select" [(ngModel)]="receiverId"><option *ngFor="let u of users" [value]="u._id">{{u.username}}</option></select></div>
      <div class="col"><input class="form-control" type="number" placeholder="Amount" [(ngModel)]="amount"></div>
      <div class="col-auto"><button class="btn btn-primary" (click)="transfer()">Transfer</button></div>
    </div>
  </div>`
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  name = '';
  username = '';
  password = '';
  receiverId = '';
  amount = 0;

  constructor(private api: ApiService) {}
  ngOnInit() { this.loadUsers(); }

  loadUsers() { this.api.nextLevelUsers().subscribe((res) => (this.users = res.users)); }

  createUser() {
    this.api.createUser({ name: this.name, username: this.username, password: this.password }).subscribe(() => {
      this.name = this.username = this.password = '';
      this.loadUsers();
    });
  }

  transfer() {
    this.api.transfer({ receiverId: this.receiverId, amount: Number(this.amount) }).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  name = '';
  username = '';
  password = '';
  receiverId = '';
  amount = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.api.nextLevelUsers().subscribe((res) => (this.users = res.users));
  }

  createUser(): void {
    this.api.createUser({ name: this.name, username: this.username, password: this.password }).subscribe(() => {
      this.name = this.username = this.password = '';
      this.loadUsers();
    });
  }

  transfer(): void {
    this.api.transfer({ receiverId: this.receiverId, amount: Number(this.amount) }).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  statement: any[] = [];
  loading = false;
  error = '';
  rechargeAmount = 0;
  constructor(
    public auth: AuthService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loadStatement();
  }

  loadStatement(): void {
    this.loading = true;

    this.api.statement().subscribe({
      next: (res: any) => {
        this.statement = res.items || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load statement';
        this.loading = false;
      }
    });
  }
  addRecharge(): void {
    if (!this.rechargeAmount || this.rechargeAmount <= 0) {
      return;
    }

    this.api.addRecharge({ amount: this.rechargeAmount }).subscribe({
      next: async () => {
        await this.auth.loadUser();
        this.loadStatement();
        this.rechargeAmount = 0;
      },
      error: () => {
        this.error = 'Recharge failed';
        this.loading = false;
      }
    });
  }
}
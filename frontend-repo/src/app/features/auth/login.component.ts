import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container mt-5" style="max-width:520px">
    <div class="card p-4 shadow-sm">
      <h4>Login</h4>
      <input class="form-control my-2" placeholder="Username" [(ngModel)]="username" />
      <input class="form-control my-2" placeholder="Password" type="password" [(ngModel)]="password" />
      <label class="small text-muted">CAPTCHA: {{ captchaQuestion }}</label>
      <input class="form-control my-2" placeholder="Captcha answer" [(ngModel)]="captchaAnswer" />
      <button class="btn btn-primary" (click)="login()">Login</button>
      <button class="btn btn-link" (click)="reloadCaptcha()">Refresh Captcha</button>
      <p class="text-danger mt-2" *ngIf="error">{{ error }}</p>
    </div>
  </div>`
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  captchaAnswer = '';
  captchaQuestion = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() { this.reloadCaptcha(); }

  reloadCaptcha() {
    this.api.getCaptcha().subscribe((res) => (this.captchaQuestion = res.question));
  }

  login() {
    this.api.login({ username: this.username, password: this.password, captchaAnswer: this.captchaAnswer }).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
        this.reloadCaptcha();
      }
    });
  }
}

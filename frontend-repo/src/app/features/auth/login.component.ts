import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  captchaAnswer = '';
  captchaQuestion = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.reloadCaptcha();
  }

  reloadCaptcha(): void {
    this.api.getCaptcha().subscribe((res) => (this.captchaQuestion = res.question));
  }

  login(): void {
    this.api.login({ username: this.username, password: this.password, captchaAnswer: this.captchaAnswer }).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
        this.reloadCaptcha();
      }
    });
  }
}

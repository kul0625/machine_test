import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  captchaAnswer: string = '';
  captchaQuestion: string = '';
  error: string = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reloadCaptcha();
  }

  reloadCaptcha(): void {
    this.api.getCaptcha().subscribe((res: any) => {
      this.captchaQuestion = res.question;
    });
  }

  login(): void {
    const payload = {
      username: this.username,
      password: this.password,
      captchaAnswer: this.captchaAnswer
    };

    this.api.login(payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
        this.reloadCaptcha();
      }
    });
  }
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any;
  constructor(private api: ApiService, private router: Router) {}

  async loadUser(): Promise<boolean> {
    try {
      const res = await this.api.me().toPromise();
      this.user = res?.user;
      return !!this.user;
    } catch {
      this.user = null;
      return false;
    }
  }

  async logout() {
    await this.api.logout().toPromise();
    this.user = null;
    this.router.navigateByUrl('/');
  }
}

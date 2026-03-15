import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { }

  getCaptcha() { return this.http.get<{ question: string }>(`${this.base}/auth/captcha`, { withCredentials: true }); }
  login(payload: unknown) { return this.http.post(`${this.base}/auth/login`, payload, { withCredentials: true }); }
  me() { return this.http.get<{ user: any }>(`${this.base}/auth/me`, { withCredentials: true }); }
  logout() { return this.http.post(`${this.base}/auth/logout`, {}, { withCredentials: true }); }
  createUser(payload: unknown) { return this.http.post(`${this.base}/auth/register`, payload, { withCredentials: true }); }
  changeUserPassword(userId: string, payload: { newPassword: string }) {
    return this.http.patch(`${this.base}/users/${userId}/password`, payload, { withCredentials: true });
  }
  nextLevelUsers() { return this.http.get<{ users: any[] }>(`${this.base}/users/next-level`, { withCredentials: true }); }
  downline(userId: string) { return this.http.get<{ tree: any }>(`${this.base}/users/downline/${userId}`, { withCredentials: true }); }
  transfer(payload: unknown) { return this.http.post(`${this.base}/balance/transfer`, payload, { withCredentials: true }); }
  addRecharge(payload: unknown) { return this.http.post(`${this.base}/balance/self-recharge`, payload, { withCredentials: true }); }
  statement() { return this.http.get<{ items: any[] }>(`${this.base}/balance/statement`, { withCredentials: true }); }
  adminNextLevelUsers() { return this.http.get<{ users: any[] }>(`${this.base}/admin/next-level`, { withCredentials: true }); }
  adminHierarchy(userId: string) { return this.http.get<{ tree: any }>(`${this.base}/admin/hierarchy/${userId}`, { withCredentials: true }); }
  adminCredit(userId: string, payload: { amount: number }) {
    return this.http.post<{ message: string; parentDebited: string; commission: number }>(
      `${this.base}/admin/credit/${userId}`,
      payload,
      { withCredentials: true }
    );
  }
  adminBalanceSummary() {
    return this.http.get<{ totalSystemBalance: number; users: any[] }>(`${this.base}/admin/balance-summary`, { withCredentials: true });
  }
}

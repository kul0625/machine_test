import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:4000/api';
  constructor(private http: HttpClient) {}

  getCaptcha() { return this.http.get<{question: string}>(`${this.base}/auth/captcha`, { withCredentials: true }); }
  login(payload: unknown) { return this.http.post(`${this.base}/auth/login`, payload, { withCredentials: true }); }
  me() { return this.http.get<{user: any}>(`${this.base}/auth/me`, { withCredentials: true }); }
  logout() { return this.http.post(`${this.base}/auth/logout`, {}, { withCredentials: true }); }
  createUser(payload: unknown) { return this.http.post(`${this.base}/auth/register`, payload, { withCredentials: true }); }
  nextLevelUsers() { return this.http.get<{users: any[]}>(`${this.base}/users/next-level`, { withCredentials: true }); }
  downline() { return this.http.get(`${this.base}/users/downline`, { withCredentials: true }); }
  transfer(payload: unknown) { return this.http.post(`${this.base}/balance/transfer`, payload, { withCredentials: true }); }
  statement() { return this.http.get<{items: any[]}>(`${this.base}/balance/statement`, { withCredentials: true }); }
}

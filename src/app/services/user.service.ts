import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(data: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: { role?: string; is_active?: boolean }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

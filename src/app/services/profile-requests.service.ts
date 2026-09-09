import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileRequestsService {
  private apiUrl = 'http://localhost:3000/api/profile-requests';

  constructor(private http: HttpClient) {}

  getAll(status?: string): Observable<any[]> {
    const url = status ? `${this.apiUrl}?status=${status}` : this.apiUrl;
    return this.http.get<any[]>(url);
  }

  approve(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/approve`, {});
  }

  reject(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/reject`, {});
  }
}

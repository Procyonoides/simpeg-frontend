import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OvertimeService {
  private apiUrl = 'http://localhost:3000/api/overtime';

  constructor(private http: HttpClient) {}

  getAll(status = ''): Observable<any[]> {
    const url = status ? `${this.apiUrl}?status=${status}` : this.apiUrl;
    return this.http.get<any[]>(url);
  }

  approve(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/approve`, {});
  }

  reject(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/reject`, {});
  }

  getAttendanceSuggestion(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/attendance-suggestion`);
  }

  createRealization(id: number, data: { actual_start: string; actual_end: string; is_holiday: boolean }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/realization`, data);
  }
}
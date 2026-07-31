import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private apiUrl = 'http://localhost:3000/api/leave';

  constructor(private http: HttpClient) {}

  getAll(status = '', type = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?status=${status}&type=${type}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  approve(id: number, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/approve`, { status });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
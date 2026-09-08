import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PayrollService {
  private apiUrl = 'http://localhost:3000/api/payroll';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getSlip(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/slip/${itemId}`);
  }

  generate(period: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, { period });
  }

  finalize(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/finalize`, {});
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

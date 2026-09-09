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

  generate(year: number, month: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, { year, month });
  }

  getByIdPaged(id: number, page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { params: { page: String(page), limit: String(limit) } });
  }

  finalize(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/finalize`, {});
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortalService {
  private apiUrl = 'http://localhost:3000/api/portal';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  updateProfile(data: { phone?: string; address?: string; bank_account?: string }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/profile`, data);
  }

  uploadPhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.http.post<any>(`${this.apiUrl}/photo`, formData);
  }

  requestChange(field_name: string, new_value: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-requests`, { field_name, new_value });
  }

  getMyChangeRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/change-requests`);
  }

  getPayslips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payslips`);
  }

  getPayslipDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/payslips/${id}`);
  }

  getMyLeaveRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leave`);
  }

  getMyLeaveBalance(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/leave-balance`);
  }

  createLeaveRequest(data: { type: string; start_date: string; end_date: string; reason: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/leave`, data);
  }
}
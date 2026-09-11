import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortalService } from '../../services/portal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave',
  standalone: false,
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  loadingHistory = false;
  requests: any[] = [];

  balance: { quota: number; used: number; remaining: number; cycle_start: string; cycle_end: string } | null = null;
  loadingBalance = false;

  constructor(
    private fb: FormBuilder,
    private portalService: PortalService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadHistory();
    this.form.get('type')?.valueChanges.subscribe(() => this.refreshBalance());
  }

  refreshBalance() {
    if (this.form.get('type')?.value !== 'annual') {
      this.balance = null;
      return;
    }
    this.loadingBalance = true;
    this.portalService.getMyLeaveBalance().subscribe({
      next: (res) => { this.balance = res; this.loadingBalance = false; },
      error: () => { this.balance = null; this.loadingBalance = false; }
    });
  }

  loadHistory() {
    this.loadingHistory = true;
    this.portalService.getMyLeaveRequests().subscribe({
      next: (res) => { this.requests = res; this.loadingHistory = false; },
      error: () => { this.loadingHistory = false; }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.portalService.createLeaveRequest(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Pengajuan berhasil dikirim, menunggu persetujuan', 'Tutup', { duration: 4000 });
        this.form.reset();
        this.submitting = false;
        this.loadHistory();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Gagal mengirim pengajuan', 'Tutup', { duration: 4000 });
        this.submitting = false;
      }
    });
  }

  typeLabel(type: string): string {
    return type === 'annual' ? 'Cuti Tahunan' : type === 'sick' ? 'Sakit' : 'Izin';
  }

  statusColor(status: string): string {
    if (status === 'approved') return 'bg-success';
    if (status === 'rejected') return 'bg-danger';
    return 'bg-warning text-dark';
  }

  statusLabel(status: string): string {
    if (status === 'approved') return 'Disetujui';
    if (status === 'rejected') return 'Ditolak';
    return 'Menunggu';
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortalService } from '../../services/portal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-overtime',
  standalone: false,
  templateUrl: './overtime.component.html',
  styleUrl: './overtime.component.scss'
})
export class OvertimeComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  loadingHistory = false;
  requests: any[] = [];

  constructor(
    private fb: FormBuilder,
    private portalService: PortalService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      planned_start: ['', Validators.required],
      planned_end: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loadingHistory = true;
    this.portalService.getMyOvertimeRequests().subscribe({
      next: (res) => { this.requests = res; this.loadingHistory = false; },
      error: () => { this.loadingHistory = false; }
    });
  }

  // Datepicker ngasih objek Date (tengah malam zona lokal). Kalau langsung di-serialize
  // (toISOString otomatis dari HttpClient), bisa mundur sehari karena dikonversi ke UTC.
  // Jadi diformat manual pakai komponen tanggal LOKAL, bukan UTC.
  private toDateString(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;

    const payload = {
      ...this.form.value,
      date: this.toDateString(this.form.value.date)
    };

    this.portalService.createOvertimeRequest(payload).subscribe({
      next: () => {
        this.snackBar.open('Pengajuan lembur berhasil dikirim, menunggu persetujuan', 'Tutup', { duration: 4000 });
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
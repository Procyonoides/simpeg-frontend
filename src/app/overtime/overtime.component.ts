import { Component, OnInit } from '@angular/core';
import { OvertimeService } from '../services/overtime.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-overtime',
  standalone: false,
  templateUrl: './overtime.component.html',
  styleUrl: './overtime.component.scss'
})
export class OvertimeComponent implements OnInit {
  requests: any[] = [];
  loading = false;
  filterStatus = 'pending';

  // Form realisasi yang lagi dibuka (null kalau gak ada yang dibuka)
  realizingId: number | null = null;
  loadingSuggestion = false;
  realizationForm = { actual_start: '', actual_end: '', is_holiday: false };
  submittingRealization = false;

  constructor(
    private overtimeService: OvertimeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.overtimeService.getAll(this.filterStatus).subscribe({
      next: (res) => { this.requests = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  setFilter(status: string) {
    this.filterStatus = status;
    this.load();
  }

  approve(r: any) {
    if (!confirm(`Setujui pengajuan lembur ${r.full_name} tanggal ${r.date}?`)) return;
    this.overtimeService.approve(r.id).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Tutup', { duration: 3000 });
        this.load();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal menyetujui', 'Tutup', { duration: 3000 })
    });
  }

  reject(r: any) {
    if (!confirm(`Tolak pengajuan lembur ${r.full_name}?`)) return;
    this.overtimeService.reject(r.id).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Tutup', { duration: 3000 });
        this.load();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal menolak', 'Tutup', { duration: 3000 })
    });
  }

  openRealization(r: any) {
    this.realizingId = r.id;
    this.realizationForm = { actual_start: '', actual_end: '', is_holiday: false };
    this.loadingSuggestion = true;

    this.overtimeService.getAttendanceSuggestion(r.id).subscribe({
      next: (res) => {
        if (res.check_in) this.realizationForm.actual_start = this.toTimeInput(res.check_in);
        if (res.check_out) this.realizationForm.actual_end = this.toTimeInput(res.check_out);
        this.loadingSuggestion = false;
      },
      error: () => { this.loadingSuggestion = false; }
    });
  }

  toTimeInput(isoString: string): string {
    const d = new Date(isoString);
    const h = String(d.getUTCHours()).padStart(2, '0');
    const m = String(d.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }

  closeRealization() {
    this.realizingId = null;
  }

  submitRealization(r: any) {
    if (!this.realizationForm.actual_start || !this.realizationForm.actual_end) {
      this.snackBar.open('Jam mulai dan selesai wajib diisi', 'Tutup', { duration: 3000 });
      return;
    }
    this.submittingRealization = true;
    this.overtimeService.createRealization(r.id, this.realizationForm).subscribe({
      next: () => {
        this.snackBar.open('Realisasi lembur berhasil disimpan', 'Tutup', { duration: 3000 });
        this.submittingRealization = false;
        this.realizingId = null;
        this.load();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Gagal menyimpan realisasi', 'Tutup', { duration: 3000 });
        this.submittingRealization = false;
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

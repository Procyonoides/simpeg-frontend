import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayrollService } from '../../services/payroll.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payroll-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  runs: any[] = [];
  loading = false;
  showGenerateForm = false;
  generating = false;
  isAdmin = false;

  // Default periode: bulan berjalan
  periodInput = new Date().toISOString().slice(0, 7); // format input type=month: YYYY-MM

  constructor(
    private payrollService: PayrollService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.hasRole('admin');
    this.loadRuns();
  }

  loadRuns() {
    this.loading = true;
    this.payrollService.getAll().subscribe({
      next: (res) => { this.runs = res; this.loading = false; },
      error: () => {
        this.snackBar.open('Gagal memuat data payroll', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onGenerate() {
    const [yearStr, monthStr] = this.periodInput.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);

    this.generating = true;
    this.payrollService.generate(year, month).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Tutup', { duration: 5000 });
        this.showGenerateForm = false;
        this.generating = false;
        this.loadRuns();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Gagal membuat payroll', 'Tutup', { duration: 5000 });
        this.generating = false;
      }
    });
  }

  onFinalize(run: any) {
    if (!confirm(`Finalisasi payroll periode ${this.monthName(run.month)} ${run.year}? Setelah ini tidak bisa dihapus.`)) return;
    this.payrollService.finalize(run.id).subscribe({
      next: () => {
        this.snackBar.open('Payroll berhasil difinalisasi', 'Tutup', { duration: 3000 });
        this.loadRuns();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal finalisasi', 'Tutup', { duration: 3000 })
    });
  }

  onDelete(run: any) {
    if (!confirm(`Hapus draft payroll periode ${this.monthName(run.month)} ${run.year}?`)) return;
    this.payrollService.remove(run.id).subscribe({
      next: () => {
        this.snackBar.open('Draft payroll dihapus', 'Tutup', { duration: 3000 });
        this.loadRuns();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal menghapus', 'Tutup', { duration: 3000 })
    });
  }

  viewDetail(run: any) {
    this.router.navigate(['/payroll', run.id]);
  }

  monthName(month: number): string {
    const names = ['Januari','Februari','Maret','April','Mei','Juni',
      'Juli','Agustus','September','Oktober','November','Desember'];
    return names[month - 1] || '';
  }
}

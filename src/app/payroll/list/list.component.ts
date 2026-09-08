import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayrollService } from '../../services/payroll.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  runs: any[] = [];
  loading = false;
  showGenerateForm = false;
  generating = false;
  isAdmin = false;

  // Default periode: bulan berjalan, format YYYY-MM
  period = new Date().toISOString().slice(0, 7);

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
    this.generating = true;
    this.payrollService.generate(this.period).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Tutup', { duration: 4000 });
        this.showGenerateForm = false;
        this.generating = false;
        this.loadRuns();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Gagal membuat payroll', 'Tutup', { duration: 4000 });
        this.generating = false;
      }
    });
  }

  onFinalize(run: any) {
    if (!confirm(`Finalisasi payroll periode ${run.period}? Setelah ini tidak bisa dihapus.`)) return;
    this.payrollService.finalize(run.id).subscribe({
      next: () => {
        this.snackBar.open('Payroll berhasil difinalisasi', 'Tutup', { duration: 3000 });
        this.loadRuns();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal finalisasi', 'Tutup', { duration: 3000 })
    });
  }

  onDelete(run: any) {
    if (!confirm(`Hapus draft payroll periode ${run.period}?`)) return;
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

}

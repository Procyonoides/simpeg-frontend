import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  leaves: any[] = [];
  loading = false;
  filterStatus = '';
  filterType = '';

  constructor(
    private leaveService: LeaveService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() { this.loadLeaves(); }

  loadLeaves() {
    this.loading = true;
    this.leaveService.getAll(this.filterStatus, this.filterType).subscribe({
      next: (data) => { this.leaves = data; this.loading = false; },
      error: () => { this.snackBar.open('Gagal memuat data', 'Tutup', { duration: 3000 }); this.loading = false; }
    });
  }

  onApprove(id: number, status: string) {
    const msg = status === 'approved' ? 'Setujui pengajuan ini?' : 'Tolak pengajuan ini?';
    if (!confirm(msg)) return;
    this.leaveService.approve(id, status).subscribe({
      next: () => {
        this.snackBar.open(status === 'approved' ? 'Disetujui' : 'Ditolak', 'Tutup', { duration: 3000 });
        this.loadLeaves();
      },
      error: () => this.snackBar.open('Gagal', 'Tutup', { duration: 3000 })
    });
  }

  onDelete(id: number) {
    if (!confirm('Yakin hapus pengajuan ini?')) return;
    this.leaveService.delete(id).subscribe({
      next: () => { this.snackBar.open('Dihapus', 'Tutup', { duration: 3000 }); this.loadLeaves(); },
      error: () => this.snackBar.open('Gagal', 'Tutup', { duration: 3000 })
    });
  }

  onAdd() { this.router.navigate(['/leave/form']); }

  formatDate(date: string) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  getDays(start: string, end: string) {
    if (!start || !end) return 0;
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  }

}

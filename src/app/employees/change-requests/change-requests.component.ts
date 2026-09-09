import { Component, OnInit } from '@angular/core';
import { ProfileRequestsService } from '../../services/profile-requests.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-requests',
  standalone: false,
  templateUrl: './change-requests.component.html',
  styleUrl: './change-requests.component.scss'
})
export class ChangeRequestsComponent implements OnInit {
  requests: any[] = [];
  loading = false;
  filter: 'pending' | 'all' = 'pending';

  fieldLabels: Record<string, string> = {
    full_name: 'Nama'
  };

  constructor(
    private profileRequestsService: ProfileRequestsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.profileRequestsService.getAll(this.filter === 'pending' ? 'pending' : undefined).subscribe({
      next: (res) => { this.requests = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  setFilter(f: 'pending' | 'all') {
    this.filter = f;
    this.load();
  }

  approve(r: any) {
    if (!confirm(`Setujui perubahan ${this.fieldLabels[r.field_name] || r.field_name} milik ${r.employee_name} menjadi "${r.new_value}"?`)) return;
    this.profileRequestsService.approve(r.id).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Tutup', { duration: 3000 });
        this.load();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal menyetujui', 'Tutup', { duration: 3000 })
    });
  }

  reject(r: any) {
    if (!confirm(`Tolak pengajuan dari ${r.employee_name}?`)) return;
    this.profileRequestsService.reject(r.id).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Tutup', { duration: 3000 });
        this.load();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal menolak', 'Tutup', { duration: 3000 })
    });
  }

}

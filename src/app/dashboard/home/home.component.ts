import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  user: any;
  today = new Date();
  loading = false;

  stats = [
    { label: 'Total Karyawan', value: '0', icon: 'people', color: '#1565c0', available: true },
    { label: 'Hadir Hari Ini', value: '–', icon: 'fingerprint', color: '#2e7d32', available: false },
    { label: 'Cuti & Izin Pending', value: '0', icon: 'event_busy', color: '#e65100', available: true },
    { label: 'Proses Gaji', value: '–', icon: 'account_balance_wallet', color: '#6a1b9a', available: false },
  ];

  departmentBreakdown: any[] = [];
  recentLeave: any[] = [];
  newThisMonth = 0;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.dashboardService.getStats().subscribe({
      next: (res) => {
        this.stats[0].value = res.total_employees;
        this.stats[2].value = res.pending_leave;
        this.newThisMonth = res.new_this_month;
        this.departmentBreakdown = res.department_breakdown || [];
        this.recentLeave = res.recent_leave || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  leaveStatusColor(status: string): string {
    if (status === 'approved') return 'bg-success';
    if (status === 'rejected') return 'bg-danger';
    return 'bg-warning text-dark';
  }

}

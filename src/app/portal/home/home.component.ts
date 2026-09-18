import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  loading = false;
  balance: any = null;
  recentLeave: any[] = [];

  constructor(
    private authService: AuthService,
    private portalService: PortalService,
    private router: Router
  ) {}

  get user() {
    return this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.loading = true;
    this.portalService.getHomeSummary().subscribe({
      next: (res) => {
        this.balance = res.leave_balance;
        this.recentLeave = res.recent_leave;
        this.loading = false;
      },
      error: () => { this.loading = false; }
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

  goToLeave() {
    this.router.navigate(['/portal/leave']);
  }

}

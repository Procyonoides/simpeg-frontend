import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  user: any;
  today = new Date();

  stats = [
    { label: 'Total Karyawan', value: 0, icon: 'people', color: '#1565c0' },
    { label: 'Hadir Hari Ini', value: 0, icon: 'fingerprint', color: '#2e7d32' },
    { label: 'Cuti & Izin', value: 0, icon: 'event_busy', color: '#e65100' },
    { label: 'Proses Gaji', value: 0, icon: 'account_balance_wallet', color: '#6a1b9a' },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

}

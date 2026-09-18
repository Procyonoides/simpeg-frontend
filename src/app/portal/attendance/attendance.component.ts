import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit {
  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  loading = false;
  records: any[] = [];
  errorMessage = '';

  months = [
    { value: 1, label: 'Januari' }, { value: 2, label: 'Februari' }, { value: 3, label: 'Maret' },
    { value: 4, label: 'April' }, { value: 5, label: 'Mei' }, { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' }, { value: 8, label: 'Agustus' }, { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' }, { value: 11, label: 'November' }, { value: 12, label: 'Desember' }
  ];

  constructor(private portalService: PortalService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMessage = '';
    this.portalService.getMyAttendance(this.year, this.month).subscribe({
      next: (res) => {
        this.records = res.records;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Gagal memuat data absensi';
        this.loading = false;
      }
    });
  }

}

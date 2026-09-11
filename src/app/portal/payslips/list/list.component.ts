import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortalService } from '../../../services/portal.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  payslips: any[] = [];
  loading = false;

  constructor(private portalService: PortalService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.portalService.getPayslips().subscribe({
      next: (res) => { this.payslips = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  monthName(month: number): string {
    const names = ['Januari','Februari','Maret','April','Mei','Juni',
      'Juli','Agustus','September','Oktober','November','Desember'];
    return names[month - 1] || '';
  }

  viewDetail(id: number) {
    this.router.navigate(['/portal/payslips', id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollService } from '../../services/payroll.service';

@Component({
  selector: 'app-payroll-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  run: any = null;
  items: any[] = [];
  pagination: any = { page: 1, limit: 25, total: 0, totalPages: 1 };
  loading = false;
  periodId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollService: PayrollService
  ) {}

  ngOnInit() {
    this.periodId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetail(1);
  }

  loadDetail(page: number) {
    this.loading = true;
    this.payrollService.getByIdPaged(this.periodId, page, this.pagination.limit).subscribe({
      next: (res) => {
        this.run = res;
        this.items = res.items;
        this.pagination = res.pagination;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  prevPage() {
    if (this.pagination.page > 1) this.loadDetail(this.pagination.page - 1);
  }

  nextPage() {
    if (this.pagination.page < this.pagination.totalPages) this.loadDetail(this.pagination.page + 1);
  }

  monthName(month: number): string {
    const names = ['Januari','Februari','Maret','April','Mei','Juni',
      'Juli','Agustus','September','Oktober','November','Desember'];
    return names[month - 1] || '';
  }

  viewSlip(itemId: number) {
    this.router.navigate(['/payroll/slip', itemId]);
  }

  back() {
    this.router.navigate(['/payroll']);
  }
}

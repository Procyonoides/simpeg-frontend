import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollService } from '../../services/payroll.service';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  run: any = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollService: PayrollService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetail(id);
  }

  loadDetail(id: number) {
    this.loading = true;
    this.payrollService.getById(id).subscribe({
      next: (res) => { this.run = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  viewSlip(itemId: number) {
    this.router.navigate(['/payroll/slip', itemId]);
  }

  back() {
    this.router.navigate(['/payroll']);
  }

}

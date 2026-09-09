import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollService } from '../../services/payroll.service';

@Component({
  selector: 'app-payroll-slip',
  templateUrl: './slip.component.html',
  styleUrl: './slip.component.scss'
})
export class SlipComponent implements OnInit {
  slip: any = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollService: PayrollService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const itemId = Number(params.get('itemId'));
      if (itemId) this.loadSlip(itemId);
    });
  }

  loadSlip(itemId: number) {
    this.loading = true;
    this.payrollService.getSlip(itemId).subscribe({
      next: (res) => { this.slip = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get additions() {
    return this.slip?.components?.filter((c: any) => c.type === 'addition') || [];
  }

  get deductions() {
    return this.slip?.components?.filter((c: any) => c.type === 'deduction') || [];
  }

  get totalBpjsPph21() {
    if (!this.slip) return 0;
    return (this.slip.bpjsk_employee || 0) + (this.slip.bpjstk_jht || 0)
      + (this.slip.bpjstk_jp || 0) + (this.slip.pph21_monthly || 0);
  }

  monthName(month: number): string {
    const names = ['Januari','Februari','Maret','April','Mei','Juni',
      'Juli','Agustus','September','Oktober','November','Desember'];
    return names[month - 1] || '';
  }

  print() {
    window.print();
  }

  back() {
    this.router.navigate(['/payroll']);
  }
}

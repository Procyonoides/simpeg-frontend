import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollService } from '../../services/payroll.service';

@Component({
  selector: 'app-slip',
  standalone: false,
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

  print() {
    window.print();
  }

  back() {
    this.router.navigate(['/payroll']);
  }

}

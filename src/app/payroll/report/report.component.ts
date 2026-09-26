import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollService } from '../../services/payroll.service';

@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
  loading = false;
  run: any = null;
  items: any[] = [];

  totals = {
    employeeCount: 0,
    basicSalary: 0,
    additions: 0,
    deductions: 0,
    bpjsPph21: 0,
    grossSalary: 0,
    netSalary: 0
  };

  departmentBreakdown: { department: string; count: number; netSalary: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payrollService: PayrollService
  ) {}

  ngOnInit() {
    const periodId = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    // Ambil semua item sekaligus (limit besar) biar gak perlu endpoint baru
    this.payrollService.getByIdPaged(periodId, 1, 10000).subscribe({
      next: (res) => {
        this.run = res;
        this.items = res.items;
        this.computeTotals();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  computeTotals() {
    const deptMap = new Map<string, { count: number; netSalary: number }>();

    for (const item of this.items) {
      this.totals.employeeCount++;
      this.totals.basicSalary += Number(item.basic_salary);
      this.totals.additions += Number(item.total_additions);
      this.totals.deductions += Number(item.total_deductions);
      this.totals.bpjsPph21 += Number(item.bpjsk_employee) + Number(item.bpjstk_jht)
        + Number(item.bpjstk_jp) + Number(item.pph21_monthly);
      this.totals.grossSalary += Number(item.gross_salary);
      this.totals.netSalary += Number(item.net_salary);

      const dept = item.department_name || 'Tanpa Departemen';
      const existing = deptMap.get(dept) || { count: 0, netSalary: 0 };
      existing.count++;
      existing.netSalary += Number(item.net_salary);
      deptMap.set(dept, existing);
    }

    this.departmentBreakdown = Array.from(deptMap.entries())
      .map(([department, v]) => ({ department, count: v.count, netSalary: v.netSalary }))
      .sort((a, b) => b.netSalary - a.netSalary);
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
    this.router.navigate(['/payroll', this.run.id]);
  }

}

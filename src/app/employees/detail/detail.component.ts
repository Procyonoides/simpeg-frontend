import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  employee: any = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.loadEmployee(id);
  }

  loadEmployee(id: number) {
    this.loading = true;
    this.employeeService.getById(id).subscribe({
      next: (data) => { this.employee = data; this.loading = false; },
      error: () => {
        this.snackBar.open('Gagal memuat data', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onEdit() {
    this.router.navigate(['/employees/form', this.employee.id]);
  }

  onBack() {
    this.router.navigate(['/employees']);
  }

  formatDate(date: string) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  formatCurrency(val: number) {
    if (!val) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  }

}

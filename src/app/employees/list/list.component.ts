import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  employees: any[] = [];
  loading = false;
  searchText = '';

  displayedColumns = ['no', 'employee_code', 'full_name', 'department', 'position', 'status', 'actions'];

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getAll().subscribe({
      next: (data) => { this.employees = data; this.loading = false; },
      error: () => { this.snackBar.open('Gagal memuat data', 'Tutup', { duration: 3000 }); this.loading = false; }
    });
  }

  get filteredEmployees() {
    if (!this.searchText) return this.employees;
    const q = this.searchText.toLowerCase();
    return this.employees.filter(e =>
      e.full_name?.toLowerCase().includes(q) ||
      e.employee_code?.toLowerCase().includes(q) ||
      e.department_name?.toLowerCase().includes(q)
    );
  }

  onAdd() { this.router.navigate(['/employees/form']); }
  onEdit(id: number) { this.router.navigate(['/employees/form', id]); }
  onDetail(id: number) { this.router.navigate(['/employees/detail', id]); }

  onDelete(id: number) {
    if (!confirm('Yakin ingin menonaktifkan karyawan ini?')) return;
    this.employeeService.delete(id).subscribe({
      next: () => { this.snackBar.open('Karyawan berhasil dinonaktifkan', 'Tutup', { duration: 3000 }); this.loadEmployees(); },
      error: () => this.snackBar.open('Gagal', 'Tutup', { duration: 3000 })
    });
  }

  // Tambah method import
  onImport(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.loading = true;
    this.http.post('http://localhost:3000/api/import/employees', formData).subscribe({
      next: (res: any) => {
        this.snackBar.open(
          `Import selesai: ${res.success} berhasil, ${res.skipped} dilewati`,
          'Tutup', { duration: 5000 }
        );
        this.loadEmployees();
      },
      error: () => {
        this.snackBar.open('Gagal import', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

}

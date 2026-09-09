import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  employees: any[] = [];
  loading = false;
  showDeleteMode = false;
  searchText = '';
  searchSubject = new Subject<string>();
  Math = Math;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [10, 20, 50, 100];
  totalRecords = 0;
  totalPages = 0;

  displayedColumns = ['no', 'employee_code', 'full_name', 'department', 'position', 'status', 'actions'];
  isAdmin = false;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}

  onResetPassword(row: any) {
    if (!confirm(`Reset password login "${row.full_name}" ke default? Password akan kembali jadi "hsk" dan wajib diganti saat login berikutnya.`)) return;
    this.userService.resetEmployeePassword(row.id).subscribe({
      next: (res) => this.snackBar.open(res.message, 'Tutup', { duration: 4000 }),
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal reset password (mungkin karyawan ini belum punya akun login)', 'Tutup', { duration: 4000 })
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.hasRole('admin');
    this.loadEmployees();

    // Debounce search
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(search => {
      this.currentPage = 1;
      this.loadEmployees(search);
    });
  }

  loadEmployees(search = '') {
    this.loading = true;
    this.employeeService.getAll(this.currentPage, this.pageSize, search).subscribe({
      next: (res) => {
        this.employees = res.data;
        this.totalRecords = res.pagination.total;
        this.totalPages = res.pagination.totalPages;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Gagal memuat data', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.searchSubject.next(this.searchText);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadEmployees(this.searchText);
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.loadEmployees(this.searchText);
  }

  onAdd() { this.router.navigate(['/employees/form']); }
  onEdit(id: number) { this.router.navigate(['/employees/form', id]); }
  onDetail(id: number) { this.router.navigate(['/employees/detail', id]); }

  onToggleStatus(employee: any) {
    const newStatus = employee.status === 'active' ? 'resigned' : 'active';
    if (!confirm(newStatus === 'active' ? 'Aktifkan kembali?' : 'Nonaktifkan karyawan ini?')) return;
    this.employeeService.toggleStatus(employee.id, newStatus).subscribe({
      next: () => {
        this.snackBar.open(newStatus === 'active' ? 'Karyawan diaktifkan' : 'Karyawan dinonaktifkan', 'Tutup', { duration: 3000 });
        this.loadEmployees(this.searchText);
      },
      error: () => this.snackBar.open('Gagal', 'Tutup', { duration: 3000 })
    });
  }

  onDeletePermanent(id: number) {
    if (!confirm('⚠️ HAPUS PERMANEN?')) return;
    if (!confirm('Konfirmasi sekali lagi — yakin?')) return;
    this.employeeService.deletePermanent(id).subscribe({
      next: () => {
        this.snackBar.open('Dihapus permanen', 'Tutup', { duration: 3000 });
        this.loadEmployees(this.searchText);
      },
      error: () => this.snackBar.open('Gagal', 'Tutup', { duration: 3000 })
    });
  }

  onImport(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    this.loading = true;
    this.http.post('http://localhost:3000/api/import/employees', formData).subscribe({
      next: (res: any) => {
        this.snackBar.open(`Import selesai: ${res.success} berhasil, ${res.skipped} dilewati`, 'Tutup', { duration: 5000 });
        this.loadEmployees();
      },
      error: () => {
        this.snackBar.open('Gagal import', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  get pages(): number[] {
    const pages = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}
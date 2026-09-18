import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit {
  searchText = '';
  searchResults: any[] = [];
  searching = false;
  private searchSubject = new Subject<string>();

  selectedEmployee: any = null;
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

  constructor(
    private employeeService: EmployeeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe(term => {
      if (!term.trim()) { this.searchResults = []; return; }
      this.searching = true;
      this.employeeService.getAll(1, 10, term).subscribe({
        next: (res: any) => {
          this.searchResults = res.data;
          this.searching = false;
        },
        error: () => { this.searching = false; }
      });
    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

  selectEmployee(emp: any) {
    this.selectedEmployee = emp;
    this.searchResults = [];
    this.searchText = emp.full_name;
    this.load();
  }

  load() {
    if (!this.selectedEmployee) return;
    this.loading = true;
    this.errorMessage = '';
    this.http.get<any>(`http://localhost:3000/api/attendance/${this.selectedEmployee.id}`, {
      params: { year: String(this.year), month: String(this.month) }
    }).subscribe({
      next: (res) => {
        this.records = res.records;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Gagal memuat data absensi';
        this.records = [];
        this.loading = false;
      }
    });
  }

}

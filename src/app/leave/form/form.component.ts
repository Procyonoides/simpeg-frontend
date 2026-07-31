import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  form: FormGroup;
  loading = false;
  employees: any[] = [];
  searchText = '';

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      employee_id: ['', Validators.required],
      type: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
    this.employeeService.getAll(1, 9999, '').subscribe({
      next: (res) => this.employees = res.data
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.leaveService.create(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Pengajuan berhasil dibuat', 'Tutup', { duration: 3000 });
        this.router.navigate(['/leave']);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Terjadi kesalahan', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onCancel() { this.router.navigate(['/leave']); }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { PositionService } from '../../services/position.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  employeeId: number | null = null;
  loading = false;
  departments: any[] = [];
  positions: any[] = [];
  filteredPositions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      // Data utama
      employee_code: ['', Validators.required],
      full_name: ['', Validators.required],
      gender: ['', Validators.required],
      birth_place: [''],
      birth_date: [''],
      nik: [''],
      no_kk: [''],
      npwp: [''],
      address: [''],
      phone: [''],
      email: [''],
      religion: [''],
      education: [''],
      // Kepegawaian
      join_date: ['', Validators.required],
      contract_type: [''],
      tax_status: [''],
      bank_account: [''],
      ibu_kandung: [''],
      // Jabatan
      department_id: [''],
      position_id: [''],
    });
  }

  ngOnInit() {
    this.loadDepartments();
    this.loadPositions();

    this.employeeId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.employeeId) {
      this.editMode = true;
      this.loadEmployee();
    }

    // Filter posisi saat departemen berubah
    this.form.get('department_id')?.valueChanges.subscribe(deptId => {
      this.filteredPositions = this.positions.filter(p => p.department_id == deptId);
      if (!this.editMode) this.form.patchValue({ position_id: '' });
    });
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({ next: (data) => this.departments = data });
  }

  loadPositions() {
    this.positionService.getAll().subscribe({
      next: (data) => {
        this.positions = data;
        const deptId = this.form.get('department_id')?.value;
        if (deptId) this.filteredPositions = data.filter((p: any) => p.department_id == deptId);
      }
    });
  }

  loadEmployee() {
    this.loading = true;
    this.employeeService.getById(this.employeeId!).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.filteredPositions = this.positions.filter(p => p.department_id == data.department_id);
        this.loading = false;
      },
      error: () => { this.snackBar.open('Gagal memuat data', 'Tutup', { duration: 3000 }); this.loading = false; }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    const action = this.editMode
      ? this.employeeService.update(this.employeeId!, this.form.value)
      : this.employeeService.create(this.form.value);

    action.subscribe({
      next: () => {
        this.snackBar.open(
          this.editMode ? 'Data karyawan berhasil diupdate' : 'Karyawan berhasil ditambahkan',
          'Tutup', { duration: 3000 }
        );
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Terjadi kesalahan', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onCancel() { this.router.navigate(['/employees']); }

}

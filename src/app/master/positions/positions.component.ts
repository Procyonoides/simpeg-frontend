import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PositionService } from '../../services/position.service';
import { DepartmentService } from '../../services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent implements OnInit {
  positions: any[] = [];
  departments: any[] = [];
  loading = false;
  showForm = false;
  editMode = false;
  selectedId: number | null = null;

  form: FormGroup;
  displayedColumns = ['no', 'department', 'name', 'basic_salary', 'actions'];

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      department_id: ['', Validators.required],
      name: ['', Validators.required],
      basic_salary: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.loadPositions();
    this.loadDepartments();
  }

  loadPositions() {
    this.loading = true;
    this.positionService.getAll().subscribe({
      next: (data) => { this.positions = data; this.loading = false; },
      error: () => { this.snackBar.open('Gagal memuat data', 'Tutup', { duration: 3000 }); this.loading = false; }
    });
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (data) => { this.departments = data; }
    });
  }

  openForm(pos?: any) {
    this.showForm = true;
    if (pos) {
      this.editMode = true;
      this.selectedId = pos.id;
      this.form.patchValue(pos);
    } else {
      this.editMode = false;
      this.selectedId = null;
      this.form.reset({ basic_salary: 0 });
    }
  }

  closeForm() {
    this.showForm = false;
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    const action = this.editMode
      ? this.positionService.update(this.selectedId!, this.form.value)
      : this.positionService.create(this.form.value);

    action.subscribe({
      next: () => {
        this.snackBar.open(
          this.editMode ? 'Jabatan berhasil diupdate' : 'Jabatan berhasil ditambahkan',
          'Tutup', { duration: 3000 }
        );
        this.closeForm();
        this.loadPositions();
      },
      error: () => {
        this.snackBar.open('Terjadi kesalahan', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onDelete(id: number) {
    if (!confirm('Yakin ingin menghapus jabatan ini?')) return;
    this.positionService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Jabatan berhasil dihapus', 'Tutup', { duration: 3000 });
        this.loadPositions();
      },
      error: () => this.snackBar.open('Gagal menghapus', 'Tutup', { duration: 3000 })
    });
  }

  formatCurrency(val: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  }

}

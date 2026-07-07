import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  loading = false;
  showForm = false;
  editMode = false;
  selectedId: number | null = null;

  form: FormGroup;
  displayedColumns = ['no', 'name', 'description', 'actions'];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.loading = true;
    this.departmentService.getAll().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Gagal memuat data', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  openForm(dept?: any) {
    this.showForm = true;
    if (dept) {
      this.editMode = true;
      this.selectedId = dept.id;
      this.form.patchValue(dept);
    } else {
      this.editMode = false;
      this.selectedId = null;
      this.form.reset();
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
      ? this.departmentService.update(this.selectedId!, this.form.value)
      : this.departmentService.create(this.form.value);

    action.subscribe({
      next: () => {
        this.snackBar.open(
          this.editMode ? 'Departemen berhasil diupdate' : 'Departemen berhasil ditambahkan',
          'Tutup', { duration: 3000 }
        );
        this.closeForm();
        this.loadDepartments();
      },
      error: () => {
        this.snackBar.open('Terjadi kesalahan', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onDelete(id: number) {
    if (!confirm('Yakin ingin menghapus departemen ini?')) return;
    this.departmentService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Departemen berhasil dihapus', 'Tutup', { duration: 3000 });
        this.loadDepartments();
      },
      error: () => {
        this.snackBar.open('Gagal menghapus', 'Tutup', { duration: 3000 });
      }
    });
  }

}

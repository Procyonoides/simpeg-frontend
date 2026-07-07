import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryComponentService } from '../../services/salary-component.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-salary-components',
  templateUrl: './salary-components.component.html',
  styleUrl: './salary-components.component.scss'
})
export class SalaryComponentsComponent implements OnInit {
  components: any[] = [];
  loading = false;
  showForm = false;
  editMode = false;
  selectedId: number | null = null;

  form: FormGroup;
  displayedColumns = ['no', 'name', 'type', 'amount', 'is_percent', 'is_taxable', 'actions'];

  constructor(
    private fb: FormBuilder,
    private salaryComponentService: SalaryComponentService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['addition', Validators.required],
      amount: [0],
      is_percent: [false],
      is_taxable: [false]
    });
  }

  ngOnInit() { this.loadComponents(); }

  loadComponents() {
    this.loading = true;
    this.salaryComponentService.getAll().subscribe({
      next: (data) => { this.components = data; this.loading = false; },
      error: () => { this.snackBar.open('Gagal memuat data', 'Tutup', { duration: 3000 }); this.loading = false; }
    });
  }

  openForm(comp?: any) {
    this.showForm = true;
    if (comp) {
      this.editMode = true;
      this.selectedId = comp.id;
      this.form.patchValue(comp);
    } else {
      this.editMode = false;
      this.selectedId = null;
      this.form.reset({ type: 'addition', amount: 0, is_percent: false, is_taxable: false });
    }
  }

  closeForm() { this.showForm = false; this.form.reset(); }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    const action = this.editMode
      ? this.salaryComponentService.update(this.selectedId!, this.form.value)
      : this.salaryComponentService.create(this.form.value);

    action.subscribe({
      next: () => {
        this.snackBar.open(
          this.editMode ? 'Komponen berhasil diupdate' : 'Komponen berhasil ditambahkan',
          'Tutup', { duration: 3000 }
        );
        this.closeForm();
        this.loadComponents();
      },
      error: () => { this.snackBar.open('Terjadi kesalahan', 'Tutup', { duration: 3000 }); this.loading = false; }
    });
  }

  onDelete(id: number) {
    if (!confirm('Yakin ingin menghapus komponen ini?')) return;
    this.salaryComponentService.delete(id).subscribe({
      next: () => { this.snackBar.open('Komponen berhasil dihapus', 'Tutup', { duration: 3000 }); this.loadComponents(); },
      error: () => this.snackBar.open('Gagal menghapus', 'Tutup', { duration: 3000 })
    });
  }

  formatCurrency(val: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  }

}

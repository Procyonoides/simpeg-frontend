import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  form: FormGroup;
  loading = false;
  errorMessage = '';
  isMandatory: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.isMandatory = this.authService.needsPasswordChange();
    this.form = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { current_password, new_password, confirm_password } = this.form.value;

    if (new_password !== confirm_password) {
      this.errorMessage = 'Konfirmasi password baru tidak sama';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.authService.changePassword(current_password, new_password).subscribe({
      next: () => {
        this.snackBar.open('Password berhasil diganti', 'Tutup', { duration: 3000 });
        this.router.navigate(['/portal']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Gagal mengganti password';
        this.loading = false;
      }
    });
  }

}

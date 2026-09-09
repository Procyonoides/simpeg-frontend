import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Blokir akses halaman portal lain selama password masih default (wajib ganti dulu)
@Injectable({ providedIn: 'root' })
export class PasswordChangeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.needsPasswordChange()) {
      this.router.navigate(['/portal/change-password']);
      return false;
    }
    return true;
  }
}

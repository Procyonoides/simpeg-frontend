import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Cuma role 'employee' yang boleh masuk portal karyawan
@Injectable({ providedIn: 'root' })
export class PortalGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    if (!this.authService.isEmployee()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}

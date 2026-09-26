import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as string[] | undefined;
    const user = this.authService.getCurrentUser();

    console.log('[RoleGuard]', { path: route.routeConfig?.path, allowedRoles, user });

    if (!user) {
      console.log('[RoleGuard] user kosong, redirect ke login');
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      console.log('[RoleGuard] role gak cocok, redirect ke dashboard');
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}

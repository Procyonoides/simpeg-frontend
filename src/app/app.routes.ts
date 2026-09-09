import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { PortalGuard } from './guards/portal.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'portal',
        canActivate: [PortalGuard],
        loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule)
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'master',
                canActivate: [RoleGuard],
                data: { roles: ['admin'] },
                loadChildren: () => import('./master/master.module').then(m => m.MasterModule)
            },
            {
                path: 'employees',
                loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
            },
            {
                path: 'leave',
                loadChildren: () => import('./leave/leave.module').then(m => m.LeaveModule)
            },
            {
                path: 'payroll',
                canActivate: [RoleGuard],
                data: { roles: ['admin', 'hr'] },
                loadChildren: () => import('./payroll/payroll.module').then(m => m.PayrollModule)
            },
            {
                path: 'users',
                canActivate: [RoleGuard],
                data: { roles: ['admin'] },
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
            }
        ]
    },
    { path: '**', redirectTo: 'auth/login' }
];

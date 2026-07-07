import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
        {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
            path: 'master',
            loadChildren: () => import('./master/master.module').then(m => m.MasterModule)
        },
        {
            path: 'employees',
            loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
        }
        ]
    }
];

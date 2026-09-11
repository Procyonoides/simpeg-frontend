import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalLayoutComponent } from './layout/layout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent as PayslipListComponent } from './payslips/list/list.component';
import { DetailComponent as PayslipDetailComponent } from './payslips/detail/detail.component';
import { LeaveComponent } from './leave/leave.component';
import { PasswordChangeGuard } from '../guards/password-change.guard';

const routes: Routes = [
  {
    path: '',
    component: PortalLayoutComponent,
    children: [
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [PasswordChangeGuard] },
      { path: 'payslips', component: PayslipListComponent, canActivate: [PasswordChangeGuard] },
      { path: 'payslips/:id', component: PayslipDetailComponent, canActivate: [PasswordChangeGuard] },
      { path: 'leave', component: LeaveComponent, canActivate: [PasswordChangeGuard] },
      { path: '', component: HomeComponent, canActivate: [PasswordChangeGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }

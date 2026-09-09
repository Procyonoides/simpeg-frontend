import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalLayoutComponent } from './layout/layout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeGuard } from '../guards/password-change.guard';

const routes: Routes = [
  {
    path: '',
    component: PortalLayoutComponent,
    children: [
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [PasswordChangeGuard] },
      { path: '', component: HomeComponent, canActivate: [PasswordChangeGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }

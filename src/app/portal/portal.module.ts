import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalLayoutComponent } from './layout/layout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent as PayslipListComponent } from './payslips/list/list.component';
import { DetailComponent as PayslipDetailComponent } from './payslips/detail/detail.component';
import { LeaveComponent } from './leave/leave.component';
import { DirectoryComponent } from './directory/directory.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { OvertimeComponent } from './overtime/overtime.component';


@NgModule({
  declarations: [
    PortalLayoutComponent,
    ChangePasswordComponent,
    HomeComponent,
    ProfileComponent,
    PayslipListComponent,
    PayslipDetailComponent,
    LeaveComponent,
    DirectoryComponent,
    AttendanceComponent,
    OvertimeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortalRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule
  ]
})
export class PortalModule { }
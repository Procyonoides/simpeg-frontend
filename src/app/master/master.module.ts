import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MasterRoutingModule } from './master-routing.module';
import { DepartmentsComponent } from './departments/departments.component';
import { PositionsComponent } from './positions/positions.component';
import { SalaryComponentsComponent } from './salary-components/salary-components.component';


@NgModule({
  declarations: [
    DepartmentsComponent,
    PositionsComponent,
    SalaryComponentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MasterRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class MasterModule { }

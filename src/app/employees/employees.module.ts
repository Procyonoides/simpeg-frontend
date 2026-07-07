import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { EmployeesRoutingModule } from './employees-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class EmployeesModule { }

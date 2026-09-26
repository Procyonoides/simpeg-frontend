import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { OvertimeRoutingModule } from './overtime-routing.module';
import { OvertimeComponent } from './overtime.component';

@NgModule({
  declarations: [
    OvertimeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OvertimeRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ]
})
export class OvertimeModule { }
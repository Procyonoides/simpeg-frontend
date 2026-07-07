import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class DashboardModule { }

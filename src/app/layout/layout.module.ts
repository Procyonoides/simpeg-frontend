import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [MainLayoutComponent]
})
export class LayoutModule { }

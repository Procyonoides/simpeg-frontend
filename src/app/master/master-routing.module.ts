import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { PositionsComponent } from './positions/positions.component';
import { SalaryComponentsComponent } from './salary-components/salary-components.component';

const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: 'positions', component: PositionsComponent },
  { path: 'salary-components', component: SalaryComponentsComponent },
  { path: '', redirectTo: 'departments', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

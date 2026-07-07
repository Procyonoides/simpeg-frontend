import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'detail/:id', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }

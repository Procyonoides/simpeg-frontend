import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SlipComponent } from './slip/slip.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'slip', component: SlipComponent },
  { path: 'slip/:itemId', component: SlipComponent },
  { path: ':id', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }

import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmploymentComponent} from './employment.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path: 'employment', component: EmploymentComponent}
    ])
  ],
  exports: [RouterModule]
})
export class EmploymentRoutingModule { }

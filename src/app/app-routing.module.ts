import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

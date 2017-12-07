import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppBarComponent} from './app-bar.component';
import {MatListModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    RouterModule
  ],
  declarations: [AppBarComponent],
  exports: [AppBarComponent]
})
export class AppBarModule { }


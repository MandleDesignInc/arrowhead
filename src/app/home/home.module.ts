import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MdlComponentsModule } from 'mdl-components';
import {HomeRoutingModule} from './home-routing.module';
import {MatButtonModule, MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdlComponentsModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

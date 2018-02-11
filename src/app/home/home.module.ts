import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {MatButtonModule, MatCardModule} from '@angular/material';
import { AppCarouselComponent } from './app-carousel/app-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [HomeComponent, AppCarouselComponent]
})
export class HomeModule { }

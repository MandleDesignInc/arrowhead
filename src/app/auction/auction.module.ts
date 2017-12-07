import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuctionComponent} from './auction.component';
import {AuctionRoutingModule} from './auction-routing.module';
import {MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AuctionRoutingModule,
    MatCardModule
  ],
  declarations: [AuctionComponent]
})
export class AuctionModule { }

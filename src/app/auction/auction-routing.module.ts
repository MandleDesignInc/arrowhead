import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuctionComponent} from './auction.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path: 'auction-vehicles', component: AuctionComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }

import { Component, OnInit } from '@angular/core';
import {AuctionPage, AuctionService} from './auction.service';
import { Location } from '@angular/common';
import {GlobalService} from '../global.service';

@Component({
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  page: AuctionPage;

  constructor(private auctionSvc: AuctionService, private globalSvc: GlobalService, private location: Location) { }

  ngOnInit() {

      let pageId = this.globalSvc.getPageId(this.location.path());

      this.auctionSvc.getAuctionPage(pageId).subscribe(page => this.page = page);
  }

}

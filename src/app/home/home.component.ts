import { Component, OnInit } from '@angular/core';
import {HomePage, HomeService} from './home.service';
import { Location } from '@angular/common';
import {GlobalService} from '../global.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  page: HomePage;

  constructor(private homeSvc: HomeService, private globalSvc: GlobalService, private location: Location) { }

  ngOnInit() {

    // let pageId = this.globalSvc.getPageId(this.location.path());

    this.homeSvc.getHomePage(1).subscribe(page => this.page = page);
  }

}

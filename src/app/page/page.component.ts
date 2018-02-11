import { Component, OnInit } from '@angular/core';
import {Page, PageService} from './page.service';
import { Location } from '@angular/common';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: Page;

  constructor(private pageSvc: PageService, private globalSvc: GlobalService, private location: Location) { }

  ngOnInit() {

    let pageId = this.globalSvc.getPageId(this.location.path());


    this.pageSvc.getPage(pageId).subscribe(page => {
      this.page = page;

      if (this.page.classKey === 'modStaticResource') {
        window.location.href = page.staticResourceContent;
      }
    });
  }

}

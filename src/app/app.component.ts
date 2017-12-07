import {Component, OnInit} from '@angular/core';
import {GlobalContent, GlobalService, NavigationItem} from './global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private globalSvc: GlobalService) { }


  ngOnInit(): void {
      this.globalSvc.init().subscribe(result => this.onReady(result));
  }

  onReady(ready: boolean): void {
      console.log(ready);
  }

  get globalContent(): GlobalContent {
    return this.globalSvc.globalContent;
  }

  get navigationMenu(): NavigationItem[] {
      return this.globalSvc.navigationMenu;
  }

}

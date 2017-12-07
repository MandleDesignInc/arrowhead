import {Component, Input, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {NavigationItem} from '../global.service';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent {
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    @Input() navigationMenu: NavigationItem[];

    constructor() { }


    openMenu() {
        this.trigger.openMenu();
    }

}

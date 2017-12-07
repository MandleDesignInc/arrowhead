import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';

import {GlobalService} from './global.service';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';


import {AppBarModule} from './app-bar/app-bar.module';
import {HomeModule} from './home/home.module';
import {AuctionModule} from './auction/auction.module';
import {EmploymentModule} from './employment/employment.module';
import {ContactModule} from './contact/contact.module';

import {
    MatButtonModule, MatExpansionModule, MatIconModule, MatListModule, MatMenuModule,
    MatSidenavModule
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {HomeService} from './home/home.service';
import { PageComponent } from './page/page.component';
import {PageModule} from './page/page.module';
import {PageService} from './page/page.service';
import {AuctionService} from './auction/auction.service';
import {EmploymentService} from './employment/employment.service';
import {ContactService} from './contact/contact.service';


@NgModule({
  declarations: [
      AppComponent,
      ErrorComponent,
      PageComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpModule,
      AppBarModule,
      HomeModule,
      PageModule,
      AuctionModule,
      EmploymentModule,
      ContactModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatExpansionModule,
      AppRoutingModule
  ],
  providers: [GlobalService, HomeService, PageService, AuctionService, EmploymentService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }

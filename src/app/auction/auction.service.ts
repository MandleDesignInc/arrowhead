import { Injectable } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';


export class AuctionItemData {
    id: number;
    title: string;
    image: string;
}

export class AuctionItem {
    state: string;

    data: AuctionItemData;

    constructor() { }

    static fromAuctionItemData(data: AuctionItemData): AuctionItem {

        let item = new AuctionItem();

        item.state = 'inactive';

        item.data = data;

        return item;
    }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }

}

export class AuctionPageData {

    auctionList: AuctionItemData[];

    id: number;
    type: string;
    contentType: string;
    pagetitle: string;
    longtitle: string;
    description: string;
    alias: string;
    link_attributes: string;
    published: boolean;
    pub_date: number;
    unpub_date: number;
    parent: number;
    isFolder: boolean;
    introtext: string;
    content: string;
    richtext: boolean;
    template: number;
    menuindex: number;
    searchable: boolean;
    cacheable: boolean;
    createdby: number;
    createdon: string;
    editedby: number;
    editedon: string;
    deleted: boolean;
    deletedby: number;
    publishedon: number;
    publishedby: number;
    menutitle: string;
    donthit: boolean;
    privateweb: boolean;
    privatemgr: boolean;
    content_dispo: boolean;
    hidemenu: boolean;
    class_key: string;
    context_key: string;
    content_type: number;
    uri: string;
    uri_override: number;
    hide_children_in_tree: number;
    show_in_tree: number;

}

export class AuctionPage {

    title: string;
    safeContent: SafeHtml;


    auctionList: AuctionItem[] = [];

    constructor() { }

    static fromPageData(data: AuctionPageData, sanitizer: DomSanitizer): AuctionPage {

        let page = new AuctionPage();

        page.title = data.pagetitle;
        page.safeContent = sanitizer.bypassSecurityTrustHtml(data.content);

        data.auctionList.forEach(item => {

            page.auctionList.push(AuctionItem.fromAuctionItemData(item));

        });

        return page;
    }

}

@Injectable()
export class AuctionService {

    private baseUrl = 'http://arrowheadyouth.org/cms/rest/page';

    constructor(private http: Http, private sanitizer: DomSanitizer) { }

    getAuctionPage(id: number): Observable<AuctionPage> {

        let url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map(response => response.json().object as AuctionPageData).map(data => AuctionPage.fromPageData(data, this.sanitizer));

  }

}

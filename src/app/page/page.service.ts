import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {DomSanitizer, SafeHtml, SafeUrl} from '@angular/platform-browser';


export class PageData {

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

export class Page {

    title: string;

    safeContent: SafeHtml;
    staticResourceContent: string;

    classKey: string;

    constructor() { }

    static fromPageData(data: PageData, sanitizer: DomSanitizer): Page {

        let page = new Page();

        if (data.class_key === 'modStaticResource') {
            let staticContent = 'http://arrowheadyouth.com/cms/' + data.content;
            page.staticResourceContent = staticContent;
        } else {
            page.safeContent = sanitizer.bypassSecurityTrustHtml(data.content);
        }

        page.title = data.pagetitle;

        page.classKey = data.class_key;

        return page;
    }

}


@Injectable()
export class PageService {

    private baseUrl = 'http://arrowheadyouth.org/cms/rest/page';

    constructor(private http: Http, private sanitizer: DomSanitizer) { }

    getPage(id:number): Observable<Page> {

        let url = `${this.baseUrl}/${id}`;

        return this.http.get(url).map(response => response.json().object as PageData).map(data => Page.fromPageData(data, this.sanitizer));

    }

}

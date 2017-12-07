import { Injectable } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';


export class ContactFormData {
    name: string = '';
    email: string = '';
    phone: string = '';
    message: string = '';

    constructor() { }

    static getFormData(data: ContactFormData) {
        let formData = new FormData();
        formData.set('requestType', 'contact');
        formData.set('name', data.name);
        formData.set('email', data.email);
        formData.set('phone', data.phone);
        formData.set('message', data.message);

        return formData;
    }
}

export class ContactPageData {


    onContactMessage: string;

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

export class ContactPage {

    safeContent: SafeHtml;
    data: ContactPageData;

    constructor() { }

    static fromContactPageData(data: ContactPageData, sanitizer: DomSanitizer): ContactPage {

        let page = new ContactPage();

        page.safeContent = sanitizer.bypassSecurityTrustHtml(data.content);

        page.data = data;

        return page;

    }

}

@Injectable()
export class ContactService {

    private baseUrl = 'http://arrowheadyouth.org/cms/rest/page';

    constructor(private http: Http, private sanitizer: DomSanitizer) { }

    getContactPage(id: number): Observable<ContactPage> {

        let url = `${this.baseUrl}/${id}`;
        return this.http.get(url).map(response => response.json().object as ContactPageData).map(data => ContactPage.fromContactPageData(data, this.sanitizer));

    }

    sendForm(id: number, contactData: ContactFormData): Observable<string> {

        let url = `${this.baseUrl}/${id}`;

        let formData: FormData = ContactFormData.getFormData(contactData);

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});

        return  this.http.post(url, formData, options).map(response => response.json()).catch(error => Observable.throw(error));
    }

}

import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { MdlSlide, MdlSlideData } from 'mdl-components/mdl-slider/mdl-slide';

export class FeatureData {
    title: string;
    desc: string;
    image: string;
    link: string;
}

export class Feature {

    state: string;

    title: string;
    safeDesc: SafeHtml;
    image: string;
    link: string;

    linkIsExternal: boolean;

    constructor() { }

    static fromFeatureData(data: FeatureData, sanitizer: DomSanitizer): Feature {
        let feature = new Feature();

        feature.state = 'inactive';
        feature.title = data.title;
        feature.safeDesc = sanitizer.bypassSecurityTrustHtml(data.desc);
        feature.image = data.image;
        feature.link = data.link;

        if (feature.link.substr(0, 4).toLowerCase() === 'http') feature.linkIsExternal = true;

        return feature;
    }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }
}


export class HomePageData {

    features: FeatureData[];
    slides: MdlSlideData[];

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

export class HomePage {

    safeContent: SafeHtml;

    slides: MdlSlide[];

    features: Feature[];

    constructor() { }

    static fromHomePageData(data: HomePageData, sanitizer: DomSanitizer): HomePage {

        let page = new HomePage;

        page.safeContent = sanitizer.bypassSecurityTrustHtml(data.content);

        page.slides = [];
        data.slides.forEach(slide => {

           page.slides.push(MdlSlide.fromData(slide));


        });

        page.features = [];
        data.features.forEach(featureData => {
            page.features.push(Feature.fromFeatureData(featureData, sanitizer));
        });


        return page;
    }

}

@Injectable()
export class HomeService {

    private baseUrl = 'http://arrowheadyouth.org/cms/rest/page';

    constructor(private http: Http, private sanitizer: DomSanitizer) { }

    getHomePage(id: number): Observable<HomePage> {

        let url = `${this.baseUrl}/${id}`;


        return this.http.get(url).map(response => response.json().object as HomePageData).map(data => HomePage.fromHomePageData(data, this.sanitizer));

    }

}

import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';


export class FooterContentData {
    info: string;
    address: string;
    phone: string;
    fax: string;
}

export class FooterContent {
    info: string;
    address: string;
    phone: string;
    phoneHREF: string;
    fax: string;

    constructor() {}

    static fromFooterContentData(data: FooterContentData): FooterContent {
        let footerContent = new FooterContent();

        footerContent.info = data.info;
        footerContent.address = data.address;

        footerContent.phone = data.phone;

        let phoneHREF = data.phone;
        phoneHREF = data.phone.replace(/[^0-9.]/g,'');

        footerContent.phoneHREF = phoneHREF;

        footerContent.fax = data.fax;

        return footerContent;
    }
}

export class RouteItemData {
    id: string;
    path: string;
    menuTitle: string;
    template: string;
    parentId: string;
}

export class NavigationItem {

    nestedItems: NavigationItem[] = [];

    constructor(public link: string, public title: string, public external: boolean = false) {

    }

    add(item: NavigationItem): void {

        this.nestedItems.push(item);
    }

    get hasChildren(): boolean {
        return this.nestedItems.length > 0;
    }


}


export class GlobalContentData {
    routeData: RouteItemData[];
    footerContent: FooterContentData;
}

export class GlobalContent {
    routes: RouteItemData[];
    footerContent: FooterContent;

    constructor() { }

    static fromGlobalContentData(data: GlobalContentData): GlobalContent {
        let globalContent = new GlobalContent();

        globalContent.routes = data.routeData;

        globalContent.footerContent = FooterContent.fromFooterContentData(data.footerContent);

        return globalContent;
    }

}


@Injectable()
export class GlobalService {

    public baseUrl = 'http://arrowheadyouth.org/';

    private restUrl = this.baseUrl + 'cms/rest/page';

    globalContent: GlobalContent;

    navigationMenu: NavigationItem[];

    constructor(private http: Http) { }


    init(): Observable<boolean> {

        this.createMockNavigationMap();

        return this.getGlobalContent(40).map(data => this.onInit(data));
    }

    onInit(data: GlobalContent): boolean {

        this.globalContent = data;

        return true;
    }

    getGlobalContent(id: number): Observable<GlobalContent> {
        let url = `${this.restUrl}/${id}`;

        return this.http.get(url).map(response => response.json().object as GlobalContentData).map(data => GlobalContent.fromGlobalContentData(data));

    }

    getPageId(locationPath: string): number {
        let routeData = this.globalContent.routes[locationPath.replace('/', '')];

        return +routeData.id;
    }

    createMockNavigationMap(): void {

        let home = new NavigationItem('/home', 'HOME');

        let about = new NavigationItem('/about', 'ABOUT');
        about.add(new NavigationItem('/mission-statement', 'Mission Statement'));
        about.add(new NavigationItem('/affiliations', 'Affiliations'));

        let successStories = new NavigationItem('/success-stories', 'Success Stories');
        successStories.add(new NavigationItem('/in-their-own-words', 'In Their Own Words'));
        about.add(successStories);

        about.add(new NavigationItem('/staff', 'Staff'));
        about.add(new NavigationItem('/board-of-directors', 'Our Board of Directors'));
        about.add(new NavigationItem('strategic-plan', '3 Year Strategic Plan', true));
        about.add(new NavigationItem('/executive-summary', 'Executive Summary'));
        about.add(new NavigationItem('/newsletter', 'Newsletter', true));


        let ourProgram = new NavigationItem('/our-program', 'OUR PROGRAM');
        ourProgram.add(new NavigationItem('/residential-programs', 'Residential Programs'));
        ourProgram.add(new NavigationItem('/programs-for-girls', 'Programs for Girls'));
        ourProgram.add(new NavigationItem('/alternative-to-detention', 'Alternative to Detention'));
        ourProgram.add(new NavigationItem('/strategies-to-succeed', 'Strategies to Succeed'));
        ourProgram.add(new NavigationItem('/education-programs', 'Education Programs'));
        ourProgram.add(new NavigationItem('/admissions', 'Admissions'));
        ourProgram.add(new NavigationItem('/family-involvement', 'Family Involvement'));
        ourProgram.add(new NavigationItem('/religion', 'Religion'));
        ourProgram.add(new NavigationItem('/independent-living-skills', 'Independent Living Skills'));
        ourProgram.add(new NavigationItem('/aftercare', 'Aftercare'));
        ourProgram.add(new NavigationItem('/additional-service', 'Additional Service'));
        ourProgram.add(new NavigationItem('/conducting-accordingly', 'Conducting Accordingly'));
        ourProgram.add(new NavigationItem('/education', 'Education'));


        let placement = new NavigationItem('/placement', 'PLACEMENT');


        let events = new NavigationItem('/events', 'EVENTS');

        let upcoming = new NavigationItem('/upcoming-events', 'Upcoming Events');
        upcoming.add(new NavigationItem('/annual-golf-outing-2017', 'Annual Golf Outing'));
        upcoming.add(new NavigationItem('/roundup', 'Roundup'));
        upcoming.add(new NavigationItem('/trivia-night-2018', 'Trivia Night'));

        events.add(upcoming);
        events.add(new NavigationItem('/annual-events', 'Annual Events'));
        events.add(new NavigationItem('/fundraisers', 'Fundraisers'));




        let action = new NavigationItem('/arrowhead-in-action', 'ARROWHEAD IN ACTION');
        let giving = new NavigationItem('/giving', 'GIVING');
        let contact = new NavigationItem('/contact', 'CONTACT');


        this.navigationMenu = [];
        this.navigationMenu.push(home);
        this.navigationMenu.push(about);
        this.navigationMenu.push(ourProgram);
        this.navigationMenu.push(placement);
        this.navigationMenu.push(events);
        this.navigationMenu.push(action);
        this.navigationMenu.push(giving);
        this.navigationMenu.push(contact);


        console.log(this.navigationMenu);

    }

}

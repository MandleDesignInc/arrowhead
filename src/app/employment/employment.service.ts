import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


export class ApplicantName {

    constructor(public firstName: string = '', public lastName: string = '') {}

}

export class ApplicantContact {


    constructor(
        public email: string = '',
        public phone: string = '',
        public street: string = '',
        public city: string = '',
        public state: string = '',
        public zip: string = ''
    ) { }

}

export class JobApplication {

    name: ApplicantName;
    contact: ApplicantContact;
    summary: string;

    resume: number;
    formData: FormData;

    constructor() {

    }

    static emptyJobApplication(): JobApplication {
        let app = new JobApplication();
        app.name = new ApplicantName();
        app.contact = new ApplicantContact();
        app.summary = '';
        app.resume = -1;

        return app;
    }

    static fromFormModel(nameValue: any, contactValue: any, summaryValue: any, resumeValue: any): JobApplication {

        let app = new JobApplication();

        app.name = new ApplicantName(nameValue.firstName, nameValue.lastName);
        app.contact = new ApplicantContact(contactValue.email, contactValue.phone, contactValue.street, contactValue.city, contactValue.state, contactValue.zip );
        app.summary = summaryValue.summary;
        app.resume = resumeValue.resume;

        return app;
    }

    static formDataFromDataModel(data: JobApplication) {
        let formData = new FormData();
        formData.set('requestType', 'application');
        formData.set('firstName', data.name.firstName);
        formData.set('lastName', data.name.lastName);
        formData.set('phone', data.contact.phone);
        formData.set('email', data.contact.email);
        formData.set('street', data.contact.street);
        formData.set('city', data.contact.city);
        formData.set('state', data.contact.state);
        formData.set('zip', data.contact.zip);
        formData.set('summary', data.summary);
        formData.set('resume', data.resume.toString());

        return formData;
    }

}

export class JobData {
  id: number;
  title: string;
  content: string;
  strippedContent: string;
  summaryPlaceholder: string;
  thankYou: string;
}

export class Job {
  state: string;
  data: JobData;

  id: number;
  title: string;

  summaryPlaceholder: string;
  thankYou: string;

  safeContent: SafeHtml;
  previewContent: string;

  constructor() { }

  static fromJobData(data: JobData, sanitizer: DomSanitizer): Job {

    let job = new Job();

    job.state = 'inactive';

    job.data = data;
    job.id = data.id;
    job.title = data.title;
    job.summaryPlaceholder = data.summaryPlaceholder;
    job.thankYou = data.thankYou;

    job.safeContent = sanitizer.bypassSecurityTrustHtml(data.content);

    job.previewContent = data.strippedContent.substr(0, 125) + '...';

    return job;

  }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }


}

export class EmploymentPageData {

    jobs: JobData[];

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

export class EmploymentPage {

    safeContent: SafeHtml;
    data: EmploymentPageData;
    jobs: Job[] = [];

    constructor() { }

    static fromEmploymentPageData(data: EmploymentPageData, sanitizer: DomSanitizer): EmploymentPage {

        let page = new EmploymentPage();

        page.safeContent = sanitizer.bypassSecurityTrustHtml(data.content);

        data.jobs.forEach(item => {
            page.jobs.push(Job.fromJobData(item, sanitizer));
        });

        page.data = data;

      return page;

  }

}

@Injectable()
export class EmploymentService {

    private baseUrl = 'http://arrowheadyouth.org/cms/rest/page';

    constructor(private http: Http, private sanitizer: DomSanitizer) { }

    getEmploymentPage(id: number): Observable<EmploymentPage> {

      let url = `${this.baseUrl}/${id}`;
      return this.http.get(url).map(response => response.json().object as EmploymentPageData).map(data => EmploymentPage.fromEmploymentPageData(data, this.sanitizer));

    }

    saveApplication(id: number, parameters: any, application: JobApplication): Observable<string> {

        let url = `${this.baseUrl}/${id}`;

        let headers = new Headers();
        return  this.http.post(url, JobApplication.formDataFromDataModel(application), {headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error));

    }

    saveFile(id: number, file: File, fileName: string): Observable<string> {

        let url = `${this.baseUrl}/${id}`;

        let formData: FormData = new FormData();
        formData.set('requestType', 'application'); // TODO: need refactoring here to clear up confusion -- pattern is to set request type in data objects static method
        formData.append('uploadFile', file, fileName);
        formData.append('pageId', id.toString());
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});

        return  this.http.post(url, formData, options)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }

}

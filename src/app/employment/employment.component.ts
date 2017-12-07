import {Component, OnInit, ViewChild} from '@angular/core';
import {EmploymentPage, EmploymentService, Job} from './employment.service';
import { Location } from '@angular/common';
import {GlobalService} from '../global.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MatDialog, MatPaginator} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ApplicationDialogComponent} from './application-dialog/application-dialog.component';



@Component({
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['position', 'description', 'apply-now'];

    page: EmploymentPage;

    dataSource: JobsDataSource;

    constructor(private employmentSvc: EmploymentService, private globalSvc: GlobalService, private location: Location, public dialog: MatDialog) { }

    ngOnInit() {

        let pageId = this.globalSvc.getPageId(this.location.path());

        this.employmentSvc.getEmploymentPage(pageId).subscribe(page => this.onPageResult(page));

    }

    onPageResult(page: EmploymentPage): void {

        this.page = page;

        this.dataSource = new JobsDataSource(this.page.jobs, this.paginator);
    }

    openApplicationDialog(job: Job): void {
        let dialogRef = this.dialog.open(ApplicationDialogComponent, {
            data: {job: job, parentId: this.page.data.id}
        });

        dialogRef.afterClosed().subscribe(result => {
           console.log('Application dialog closed');
        });
    }

}


export class JobsDataSource extends DataSource<Job> {

    constructor(private jobs: Job[], private paginator: MatPaginator) {
        super();
    }

    connect(): Observable<Job[]> {
        return Observable.of(this.jobs);
    }

    disconnect(collectionViewer: CollectionViewer): void {
        console.log('JobsDataSource Disconnected');
    }

}

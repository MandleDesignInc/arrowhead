import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatStepper} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmploymentService, JobApplication} from '../employment.service';

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.css']
})
export class ApplicationDialogComponent implements OnInit {

    @ViewChild('stepper') stepper: MatStepper;
    @ViewChild('file') resumeField;

    submitted: boolean = false;
    resumeAttached: boolean = false;

    application: JobApplication;

    nameForm: FormGroup;
    contactForm: FormGroup;
    summaryForm: FormGroup;
    resumeForm: FormGroup;


    constructor(
        private fb:FormBuilder,
        public dialogRef: MatDialogRef<ApplicationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private employmentSvc: EmploymentService
    ) { }

    ngOnInit() {

      this.nameForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required]
      });

      this.contactForm = this.fb.group({
          email: ['', Validators.email],
          phone: ['', Validators.pattern('^(\\(?[0-9]{3}\\)?)((\\s|\\-){1})?[0-9]{3}((\\s|\\-){1})?[0-9]{4}$')],
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip: ['', Validators.required]
      });

      this.summaryForm = this.fb.group({
          summary: ['']
      });

      this.resumeForm = this.fb.group({
          resume: ['']
      });


      this.application = JobApplication.emptyJobApplication();
      this.watchChanges();

    }

    watchChanges() {

        this.nameForm.get('firstName').valueChanges.subscribe((value) => this.application.name.firstName = value);
        this.nameForm.get('lastName').valueChanges.subscribe((value) => this.application.name.lastName = value);

        this.contactForm.get('email').valueChanges.subscribe((value) => this.application.contact.email = value);
        this.contactForm.get('phone').valueChanges.subscribe((value) => this.application.contact.phone = value);
        this.contactForm.get('street').valueChanges.subscribe((value) => this.application.contact.street = value);
        this.contactForm.get('city').valueChanges.subscribe((value) => this.application.contact.city = value);
        this.contactForm.get('state').valueChanges.subscribe((value) => this.application.contact.state = value);
        this.contactForm.get('zip').valueChanges.subscribe((value) => this.application.contact.zip = value);

        this.summaryForm.get('summary').valueChanges.subscribe((value) => this.application.summary = value);
        this.resumeForm.get('resume').valueChanges.subscribe((value) => console.log('form value of resume: ' + value));

    }

    onFileChange(event) {
        let files = event.target.files;

        console.log(files[0].size);

        if (files.length > 0) {

            this.application.resume = new Date().getTime();

            this.employmentSvc.saveFile(this.data.parentId, files[0], this.application.resume.toString()).subscribe(success => {
                console.log(success);
            }, error => {
                console.log(error);
            });

        }

    }

    sendApplication(): void {

        let parameters = null;

        this.employmentSvc.saveApplication(this.data.parentId, parameters, this.application).subscribe(
                success => {
                    this.stepper.next();
                    console.log(success);
                },
                error => {
                    console.log(error);
                });

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

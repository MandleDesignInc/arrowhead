import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ContactFormData, ContactPage, ContactService} from './contact.service';
import {GlobalService} from '../global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    devModeEnabled: boolean = false;

    page: ContactPage;

    contactForm: FormGroup;

    contactFormData: ContactFormData;

    constructor(private fb: FormBuilder, private contactSvc: ContactService, private globalSvc: GlobalService, private location: Location, public snackBar: MatSnackBar) { }

    ngOnInit() {

        let pageId = this.globalSvc.getPageId(this.location.path());

        this.contactSvc.getContactPage(pageId).subscribe(page => this.page = page);

        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.email],
            phone: ['', Validators.pattern('^(\\(?[0-9]{3}\\)?)((\\s|\\-){1})?[0-9]{3}((\\s|\\-){1})?[0-9]{4}$')],
            message: ['', Validators.required]
        });

        this.contactFormData = new ContactFormData();
        this.watchChanges();

    }

    watchChanges() {

        this.contactForm.get('name').valueChanges.forEach((value) => this.contactFormData.name = value);
        this.contactForm.get('email').valueChanges.forEach((value) => this.contactFormData.email = value);
        this.contactForm.get('phone').valueChanges.forEach((value) => this.contactFormData.phone = value);
        this.contactForm.get('message').valueChanges.forEach((value) => this.contactFormData.message = value);

    }

    onSendForm() {
      this.contactSvc.sendForm(this.page.data.id, this.contactFormData).subscribe(result => this.afterSendForm(result));
    }

    afterSendForm(result: string) {

        this.contactForm.disable();

        let snackBarRef = this.snackBar.open(this.page.data.onContactMessage, 'CLOSE', {});

        // snackBarRef.afterDismissed().subscribe(() => {});
    }

    get isReady(): boolean {

      if (this.page) return true;

      return false;

    }

}

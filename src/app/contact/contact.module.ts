import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ContactComponent } from './contact.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {ContactRoutingModule} from './contact-routing.module';


@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      ContactRoutingModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSnackBarModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }

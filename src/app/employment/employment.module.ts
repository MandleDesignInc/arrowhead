import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { EmploymentComponent } from './employment.component';
import {EmploymentRoutingModule} from './employment-routing.module';
import {
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatStepperModule,
    MatTableModule
} from '@angular/material';
import { ApplicationDialogComponent } from './application-dialog/application-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    EmploymentRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmploymentComponent, ApplicationDialogComponent],
  entryComponents: [ApplicationDialogComponent]
})
export class EmploymentModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlSliderComponent } from './mdl-slider/mdl-slider.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [MdlSliderComponent],
    exports: [MdlSliderComponent]
})
export class MdlComponentsModule { }

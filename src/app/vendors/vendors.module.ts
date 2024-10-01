import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';
import { VendorFormComponent } from '../vendor/vendor-form/vendor-form.component';
import { VendorListComponent } from '../vendor/vendor-list/vendor-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  
    VendorsComponent,
    VendorFormComponent,
    VendorListComponent
  ],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    ReactiveFormsModule
  ]
})
export class VendorsModule { }

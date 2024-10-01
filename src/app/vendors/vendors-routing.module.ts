import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VendorListComponent} from '../vendor/vendor-list/vendor-list.component'
import {VendorFormComponent} from '../vendor/vendor-form/vendor-form.component'
import { VendorsComponent } from './vendors.component';

const routes: Routes = [

  { path: '', component: VendorListComponent },
  { path: 'vendors/vendorlist', component : VendorListComponent },
  { path: 'vendors/vendorsform', component : VendorFormComponent },
  { path: 'vendors/edit/:vendorCode', component : VendorFormComponent },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule { }




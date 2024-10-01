import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoiceFormComponent } from '../invoice/invoice-form/invoice-form.component';
import { InvoiceListComponent } from '../invoice/invoice-list/invoice-list.component';
import { VendorListComponent } from '../vendor/vendor-list/vendor-list.component';
import { VendorFormComponent } from '../vendor/vendor-form/vendor-form.component';

const routes: Routes = [

  { path: '', component: InvoiceListComponent },
  { path: 'edit/:invoiceNumber', component : InvoiceFormComponent },
  { path: 'invoice/invoiceform', component : InvoiceFormComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }

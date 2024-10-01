import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceListComponent } from '../invoice/invoice-list/invoice-list.component';
import { InvoiceFormComponent } from '../invoice/invoice-form/invoice-form.component';


@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceListComponent,
    InvoiceFormComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InvoicesModule { }

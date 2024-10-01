import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { CurrencyListComponent } from './currency/currency-list/currency-list.component';
import { VendorFormComponent } from './vendor/vendor-form/vendor-form.component';
import { CurrencyFormComponent } from './currency/currency-form/currency-form.component';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // { path: 'vendors', component: VendorListComponent },
  // { path: 'vendors/vendorsform', component: VendorFormComponent },
  // { path: 'vendors/edit/:vendorCode', component: VendorFormComponent },
  // { path: 'invoices', component: InvoiceListComponent },
  // { path: 'invoices/invoiceform', component: InvoiceFormComponent },
  // { path: 'invoices/edit/:invoiceNumber', component: InvoiceFormComponent },
  // { path: 'currencies', component: CurrencyListComponent },
  // { path: 'currencies/currenciesform', component: CurrencyFormComponent },
  // { path: 'currencies/edit/:currencyCode', component: CurrencyFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendors', loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'currencies', loadChildren: () => import('./currencies/currencies.module').then(m => m.CurrenciesModule) },

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

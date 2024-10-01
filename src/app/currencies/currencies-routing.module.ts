import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './currencies.component';
import { CurrencyListComponent } from '../currency/currency-list/currency-list.component';
import { CurrencyFormComponent } from '../currency/currency-form/currency-form.component';

const routes: Routes = [
  { path: '', component: CurrencyListComponent },
  { path: 'currencies/currenciesform', component : CurrencyFormComponent },
  { path: 'edit/:currencyCode', component : CurrencyFormComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }

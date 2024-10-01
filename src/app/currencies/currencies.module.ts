import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyFormComponent } from '../currency/currency-form/currency-form.component';
import { CurrencyListComponent } from '../currency/currency-list/currency-list.component';


@NgModule({
  declarations: [
    CurrenciesComponent,
    CurrencyFormComponent,
    CurrencyListComponent
  ],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CurrenciesModule { }

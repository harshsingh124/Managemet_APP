import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {
 
  invoices: any[] = [];
  currencies:any[] = [];
  vendors:any[]  = []
  isEditMode:any

  numberOfPages: number = 1; 
currentPage: number = 1;
pagedinvoice: any[] = []; 
invoicePerPage: number = 5;
vId: number = 0;
cId :number = 0;

constructor(private apiService: ApiService , private router : Router) { }

updatePagedinvoice() {
  const startIndex = (this.currentPage - 1) * this.invoicePerPage;
  const endIndex = startIndex + this.invoicePerPage;
  this.pagedinvoice = this.invoices.slice(startIndex, endIndex);
}


goToPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePagedinvoice();
  }
}


goToNextPage() {
  if (this.currentPage < this.numberOfPages) {
    this.currentPage++;
    this.updatePagedinvoice();
  }
}

onChange(){

  this.apiService.filterinvoice(this.cId,this.vId).subscribe((data: any[]) => {
    this.invoices = data;
    console.log(data);
  });
}


  ngOnInit(): void {
    this.loadInvoices();
    this.loadCurrencies();
    this.loadVendors()
  }

  loadInvoices() {
    this.apiService.getInvoices().subscribe((data: any[]) => {
      this.invoices = data;
      this.apiService.Invoicecount().subscribe((data:any)=>{
        this.numberOfPages = Math.ceil(data/ this.invoicePerPage);
        this.updatePagedinvoice();    
      })
    });
  }

  
  loadCurrencies() {
    this.apiService.getCurrencies().subscribe(
      data => this.currencies = data,
      error => console.error('Error loading currencies', error)
    );
  }

  loadVendors() {
    this.apiService.getVendors().subscribe(
      data => this.vendors = data,
      error => console.error('Error loading vendors', error)
    );
  }
  
  

  editInvoice(invoiceId: number) {
    this.router.navigate([`invoices/edit/${invoiceId}`]);
    console.log(invoiceId);
  }
  
  deleteInvoice(id:number) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.apiService.deleteInvoice(id).subscribe(() => {
        this.loadInvoices();
      });
    }
  }

  getCurrencyCode(currencyId: number) {
    const currency = this.currencies.find(code => code.currencyId === currencyId);
  
    if (currency) {
      
      return currency.currencyCode; 
    } else {
      return null; 
    }
  }

  getVendorCode(vendorId: number) {
    const vendor = this.vendors.find(code => code.vendorId === vendorId);
  
    if (vendor) {
     
      return vendor.vendorName; 
    } else {
      return null; 
    }
  }
  

  downloadCSV() {
    const csvData = this.convertToCSV(this.invoices);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'invoices.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(invocies: any[]): string {
    const header = 'Invoice ID,Invoice Number,Currency ID,Vendor ID,Invoice Amount,Invoice Received Date,Invoice Due Date , Is Active\n';
    const rows = invocies.map(invoice => [
     invoice.invoiceId,
     invoice.invoiceNumber,
     invoice.currencyId,
     invoice.vendorId,
     invoice.invoiceAmount,
     invoice.invoiceReceivedData,
     invoice.invoiceDueDate,
     invoice.Active
    ].join(',')).join('\n');

    return header + rows;
  }
}

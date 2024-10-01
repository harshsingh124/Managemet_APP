import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit{



  isEditMode:any
  invoices:any[] = []
  currencies: any[] = [];
  vendors: any[] = [];
  invoiceForm: FormGroup;
  currencyCode: string | null;
  invoiceNumber: number | any;
  


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
  
      invoiceNumber:['', Validators.required],
      currencyId: [null, Validators.required],
      vendorId: [null, Validators.required],
      invoiceAmount: ['', [Validators.required,Validators.min(0)]],
      ReceivedDate: ['', Validators.required],
      invoiceDueDate: ['', Validators.required],
      isActive:[true] 
    });

    this.loadCurrencies();
    this.loadVendors();

    const invoiceData = {
      ...this.invoiceForm.value,
      vendorId: Number(this.invoiceForm.value.vendorId),
      currencyId: Number(this.invoiceForm.value.currencyId)
  };
  

    this.route.paramMap.subscribe(params => {
      this.invoiceNumber = params.get('invoiceNumber');
      if (this.invoiceNumber) {
        this.isEditMode = true
        this.loadInvoice(this.invoiceNumber);
      }
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
 

  loadInvoice(invoiceNumber: number) {
    this.apiService.getInvoice(invoiceNumber).subscribe(
      data => {
        this.invoiceForm.patchValue(data);
        this.invoiceForm.get('ReceivedDate')?.setValue(

         formatDate(data.receivedDate, 'yyyy-MM-dd', 'en-US')
        )
        this.invoiceForm.get('invoiceDueDate')?.setValue(

          formatDate(data.invoiceDueDate, 'yyyy-MM-dd', 'en-US')
         )
        
      },
      error => {
        console.error('Error loading invocie data', error);
        this.router.navigate(['invoices']);
        console.log("error");
      }
    );
  }

  updateInvoice() {
    if (this.invoiceNumber) {
      const updatedInvoice = {
        ...this.invoiceForm.value,
     
     
      };
      console.log(updatedInvoice);
      this.apiService.updateInvoice(updatedInvoice).subscribe(
        () => this.router.navigate(['invoices']),
        error => {
          // debugger;
          alert("Error while editing values")
          console.log(error.error);
        }
      );
    }
  }


addInvoice() {
  const invoiceData = {
      invoiceNumber: this.invoiceForm.value.invoiceNumber,
      currencyId: this.invoiceForm.value.currencyId,
      vendorId: this.invoiceForm.value.vendorId,
      invoiceAmount: this.invoiceForm.value.invoiceAmount,
      receivedDate: this.invoiceForm.value.ReceivedDate,
      invoiceDueDate: this.invoiceForm.value.invoiceDueDate,
      isActive:this.invoiceForm.value.isActive

  };

  console.log(invoiceData); 

  this.apiService.addInvoice(invoiceData).subscribe(
      response => {
        this.router.navigate(['invoices'])
        console.log('Invoice added successfully:', response);
      },
      error => {
          console.error('Error adding invoice', error);
          alert("Error while adding the data")
      }
  );
}


  
  
}

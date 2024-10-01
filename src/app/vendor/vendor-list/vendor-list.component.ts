import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent {

  vendors: any[] = [];
isEditMode: any;


currentPage: number = 1;  
pageSize: number = 3;     
totalVendors: number = 0; 
totalPages: number = 0;   


// updatePagedVendors() {
//   const startIndex = (this.currentPage - 1) * this.vendorsPerPage;
//   const endIndex = startIndex + this.vendorsPerPage;
//   this.pagedVendors = this.vendors.slice(startIndex, endIndex);
// }


// goToPreviousPage() {
//   if (this.currentPage > 1) {
//     this.currentPage--;
//     this.updatePagedVendors();
//   }
// }


// goToNextPage() {
//   if (this.currentPage < this.numberOfPages) {
//     this.currentPage++;
//     this.updatePagedVendors();
//   }
// }



  constructor(private apiService: ApiService , private router : Router) { }

  ngOnInit(): void {
    this.loadVendors();
  }

  

  loadVendors() {
    this.apiService.paginationvendor(this.currentPage , this.pageSize).subscribe((data: any) => {
      this.vendors = data.vendor; 
      this.totalVendors = data.totalVendors; 
      this.totalPages = Math.ceil(this.totalVendors / this.pageSize); 
      console.log(data);   
      },
    
    (error) => {
      console.error('Error loading vendors', error);
      alert('Failed to load currencies. Please try again later.');
    }
    )
    
  }

  
  editVendor(vendorCode: string) {
    this.router.navigate([`vendors/vendors/edit/${vendorCode}`]);
    console.log(vendorCode);

  }
  
  deleteVendor(vendorId: number) {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.apiService.deleteVendor(vendorId).subscribe(
        () => {
          this.loadVendors();
          console.log('Vendor deleted successfully!'); 
        },
        (error) => {
          alert('Vendor is present in Invoice.'); 
          console.log(error);
        }
      );
    } else {
      console.log('Deletion canceled.'); 
    }
  }

  


  downloadCSV() {
    const csvData = this.convertToCSV(this.vendors);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'vendors.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(vendors: any[]): string {
    const header = 'Vendor ID,Vendor Name,Vendor Code,Vendor Phone Number,Vendor Email,Vendor Created On,Vendor Is Active\n';
    const rows = vendors.map(vendor => [
      vendor.vendorId,
      vendor.vendorLongName,
      vendor.vendorCode,
      vendor.vendorPhoneNumber,
      vendor.vendorEmail,
      vendor.vendorCreatedOn,
      vendor.isActive
    ].join(',')).join('\n');

    return header + rows;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadVendors();
    }
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadVendors();
    }
  }

}


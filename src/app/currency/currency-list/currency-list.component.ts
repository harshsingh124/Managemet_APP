import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent {

  currencies: any[] = [];
  isEditMode: any;

  currentPage: number = 1;  
  pageSize: number = 3;     
  totalCurrencies: number = 0; 
  totalPages: number = 0;    

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.apiService.pagination(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.currencies = data.currency; 
        this.totalCurrencies = data.totalCurrencies; 
        this.totalPages = Math.ceil(this.totalCurrencies / this.pageSize); 
        // console.log(data);
      },
      (error) => {
        console.error('Error loading currencies', error);
        alert('Failed to load currencies. Please try again later.');
      }
    );
  }
  
  editCurrency(currencyId: number) {
    this.router.navigate([`currencies/edit/${currencyId}`]);
  }
  
  deleteCurrency(currencyId: number) {
    if (confirm('Are you sure you want to delete this currency?')) {
      this.apiService.deleteCurrency(currencyId).subscribe(
        () => {
          this.loadCurrencies(); 
        },
        (error) => {
          alert("Currency is Present in Invoice");
          console.log(error);
        }
      );
    }
  }
  
  downloadCSV() {
    const csvData = this.convertToCSV(this.currencies);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'currency.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(currencies: any[]): string {
    const header = 'Currency ID,Currency Name,Currency Code,Is Active\n';
    const rows = currencies.map(currency => [
      currency.currencyId,
      currency.currencyName,
      currency.currencyCode,
      currency.isActive
    ].join(',')).join('\n');

    return header + rows;
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCurrencies();
    }
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCurrencies();
    }
  }
}

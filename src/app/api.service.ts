import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private apiUrlvendor = 'https://localhost:7113/api/Vendor'; 
  private apiUrlinvoice = 'https://localhost:7113/api/Invoice'; 
  private apiUrlcurrency = 'https://localhost:7113/api/Currency'; 

  constructor(private http: HttpClient) { }

  // Vendor Methods
  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlvendor}/List`)
  }

  getVendor(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlvendor}/getbyid/${id}`)
  }

  Vedorcount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlvendor}/count`)
  }

  getAllVendorCodes(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrlvendor}/list`).pipe(
      map(vendors => vendors.map(vendor => vendor.vendorCode)), 
    );
  }

  addVendor(vendor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlvendor}/add`, vendor)
  }

  updateVendor(vendor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlvendor}/edit`, vendor)
  }

  deleteVendor(vendorId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlvendor}/delete/${vendorId}`)
  }

  paginationvendor(pageNumber: number = 1, pageSize: number = 3): Observable<any> {
    return this.http.get<any>(`${this.apiUrlvendor}/pagination/${pageNumber}?pageSize=${pageSize}`);
  }





 // Invoice Methods
  getInvoices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlinvoice}/List`);
  }

  getInvoice(invoicid: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlinvoice}/getbyid/${invoicid}`)
  }

  filterinvoice(cId: number , vId :number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlinvoice}/filterinvoice/${cId}/${vId}`)
  }

  Invoicecount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlinvoice}/count`)
  }

  addInvoice(invoice: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlinvoice}/add`, invoice);
  }

  
  updateInvoice(invocie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlinvoice}/edit`, invocie)
  }

  deleteInvoice(invoiceNumber: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlinvoice}/Delete/${invoiceNumber}`);
  }



  getPropertyValues(property: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlinvoice}/getbypropert/${property}`);
  }


  filterByProperty(property: string, value: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlinvoice}/getbypropert/${property}/${value}`);
  }





  // Currency Method
  getCurrencies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlcurrency}/AllCurrency`);
  }
 
  getCurrency(currencyId:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlcurrency}/getbyid/${currencyId}`);
  }

  Currencycount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlcurrency}/count`)
  }

  addCurrency(currency: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlcurrency}/add`, currency);
  }
 
  updateCurrency(currency: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlcurrency}/edit`, currency);
  }
 
  deleteCurrency(currencyId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlcurrency}/delete/${currencyId}`);
  }

  pagination(pageNumber: number = 1, pageSize: number = 3): Observable<any> {
    return this.http.get<any>(`${this.apiUrlcurrency}/pagination/${pageNumber}?pageSize=${pageSize}`);
  }

}


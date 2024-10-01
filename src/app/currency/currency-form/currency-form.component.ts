import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css']
})
export class CurrencyFormComponent implements OnInit {
  currencyForm: FormGroup;
  currencyCode: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      currencyId: [null],
      currencyName: ['', Validators.required],
      currencyCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[A-Z]{3}$')]],
      isActive: [true]  
    });

    this.route.paramMap.subscribe(params => {
      this.currencyCode = params.get('currencyCode');
      if (this.currencyCode) {
        this.isEditMode = true;
        this.loadCurrency(this.currencyCode);
      }
    });
  }

  loadCurrency(currencyCode: string) {
    this.apiService.getCurrency(currencyCode).subscribe(
      data => {
        this.currencyForm.patchValue(data);
      },
      error => {
        console.error('Error loading currency data', error);
        this.router.navigate(['/currencies']);
      }
    );
  }

  updateCurrency() {
    if (this.isEditMode) {
      const updatedCurrency = {
        currencyId: this.currencyForm.get('currencyId')?.value,
        ...this.currencyForm.value
      };
      console.log(updatedCurrency);
      this.apiService.updateCurrency(updatedCurrency).subscribe(
        () => this.router.navigate(['/currencies']),
        error => {
          console.error('Error updating currency', error);
          alert('Failed to update currency. Please check the values and try again.');
        }
      );
    }
  }

  addCurrency() {
   
    const currencyData = {
      ...this.currencyForm.value
    };

    delete currencyData.currencyId; 

    this.apiService.addCurrency(currencyData).subscribe(
      () => this.router.navigate(['/currencies']),
      error => {
        console.error('Error adding currency', error);
        alert('Failed to add currency. Please check the values and try again.');
      }
    );
  }
}

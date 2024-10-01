import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {

  vendorForm: FormGroup;
  vendorCode1: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      vendorId: [null],
      vendorCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      vendorName: ['', Validators.required],
      vendorPhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      vendorEmail: ['', [Validators.required, Validators.email]],
      vendorCreatedOn: [new Date()], // Automatically set to current date
      isActive: [true]
    });

    this.route.paramMap.subscribe(params => {
      this.vendorCode1 = params.get('vendorCode');
      if (this.vendorCode1) {
        this.isEditMode = true;
        this.loadVendor(this.vendorCode1);
      }
    });
  }

  loadVendor(vendorCode: string) {
    this.apiService.getVendor(vendorCode).subscribe(
      data => {
        this.vendorForm.patchValue(data);
      },
      error => {
        console.error('Error loading vendor data', error);
        alert('Failed to load vendor data. Redirecting to vendor list.');
        this.router.navigate(['vendors']);
      }
    );
  }

  updateVendor(): void {
    if (this.vendorCode1) {
      const updatedVendor = {
        vendorId: this.vendorForm.get('vendorId')?.value,
        ...this.vendorForm.value
      };
      console.log(updatedVendor);
      this.apiService.updateVendor(updatedVendor).subscribe(
        () => this.router.navigate(['vendors']),
        error => {
          console.error('Error updating vendor', error);
          alert('Failed to update vendor. Please check the input values.');
        }
      );
    }
  }

  addVendor(): void {
    const newVendor = {
      ...this.vendorForm.value
    };
    
    delete newVendor.vendorId; // Exclude vendorId for new vendor

    console.log(newVendor);
    this.apiService.addVendor(newVendor).subscribe(
      () => this.router.navigate(['vendors']),
      error => {
        console.error('Error adding vendor', error);
        alert('Failed to add vendor. Please check the input values.');
      }
    );
  }
}

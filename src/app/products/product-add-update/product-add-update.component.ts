import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add-update',
  templateUrl: './product-add-update.component.html',
  styleUrl: './product-add-update.component.css'
})
export class ProductAddUpdateComponent {
  productForm: FormGroup | undefined;
  productId: any = null;
  product: any = null;

  constructor(private fb: FormBuilder,
              private productService: ProductsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.queryParamMap.get('productId')

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  
    if(this.productId != null){
      this.productService.getProductById(this.productId).subscribe(res => {
        if(res.status == "success"){
          this.product = res?.data?.data
          this.patchKeyValue('name', this.product.name)
          this.patchKeyValue('price', this.product.price)
          this.patchKeyValue('quantity', this.product.quantity)
          this.patchKeyValue('description', this.product.description)
          this.patchKeyValue('category', this.product.category)
        } else {
          this.toastr.error('Failed to load product data. Please try again.', 'Error');
        }
      })
    }
  }

  patchKeyValue(key: string, value: any): void {
    if (this.productForm?.contains(key)) {
      this.productForm.get(key)?.patchValue(value);
    } else {
      console.error(`Key "${key}" does not exist in the form.`);
    }
  }

  onSubmit(): void {
    if (this.productForm?.valid && this.productId == null) {
      this.productService.addProducts(this.productForm?.value).subscribe(res => {
        if (res.status == "success") {
          this.toastr.success('Product added successfully!', 'Success');
          this.router.navigateByUrl('/products')
        }
      })
    } else if(this.productForm?.valid && this.productId != null){
      this.productService.updateProduct(this.productForm?.value,this.productId).subscribe(res => {
        if (res.status == "success") {
          this.toastr.success('Product updated successfully!', 'Success');
          this.router.navigateByUrl('/products')
        }
      })
    }
  }
}

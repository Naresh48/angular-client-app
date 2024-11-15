import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  p: Number = 1;
  productNumberId: Number = 0;

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe(response => {
      this.products = response.data?.data
    });
  }

  paginate(event: any) {
    this.p = event
  }

  deleteProduct(productId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      this.productsService.delete(productId).subscribe({
        next: (response) => {
          this.getAllProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        },
        complete: () => {
          console.log('Delete request completed');
        }
      });
    }
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`/products/add?productId=${productId}`);
  }
  

  addProduct() {
    this.router.navigateByUrl("/products/add");
  }
}

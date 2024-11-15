import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productApiUrl = 'http://127.0.0.1:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.productApiUrl);
  }


  delete(productId: string): Observable<any> {
    return this.http.delete(`${this.productApiUrl}/${productId}`);
  }

  addProducts(product: object): Observable<any> {
    return this.http.post(`${this.productApiUrl}`, product)
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.productApiUrl}/${productId}`);
  }

  updateProduct(product: object, productId: string): Observable<any> {
    return this.http.patch(`${this.productApiUrl}/${productId}`, product);
  }
}
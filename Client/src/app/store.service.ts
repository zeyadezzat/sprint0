import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StoreService {

  getProductsUrl = "http://localhost:3000/api/product/getProducts";
  updateProductUrl = "http://localhost:3000/api/product/updateProduct/";
  deleteProductUrl = "http://localhost:3000/api/product/deleteProduct/";
  createProductUrl = "http://localhost:3000/api/product/createProduct";
  constructor(private http: HttpClient) { }

  
  createProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.createProductUrl, product, httpOptions);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.getProductsUrl);
  }

  updateProduct(product: Product): Observable<any> {
    var url = this.updateProductUrl + product._id;
    return this.http.patch<any>(url, product,  httpOptions);
  }

  deleteProduct(product: Product): Observable<any> {
    var url = this.deleteProductUrl + product._id;
    return this.http.delete<any>(url);
  }
}

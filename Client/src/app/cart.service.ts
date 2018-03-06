import { Injectable } from '@angular/core';
import { Cart, Product } from './definitions'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CartService {

  constructor(private http: HttpClient, private userService: UserService, private messageService: MessageService) { }

  // Return Cart
  getCart(): any {
    var user = this.userService.getUser();
    if (user)
      return this.http.get<any>('http://localhost:3000/api/user/' + user._id + '/cart', httpOptions);
    else
      return this.getCartFromLocalStorage();

  }

  // Update Cart
  updateCart(tempCart: Cart): Observable<any> {
    var user = this.userService.getUser();
    return this.http.post<any>('http://localhost:3000/api/user/' + user._id + '/cart', tempCart, httpOptions);
  }

  // Add Cart If No Cart Is On The Server
  addCart(tempCart: Cart): Observable<any> {
    var user = this.userService.getUser();
    return this.http.post<any>('http://localhost:3000/api/user/' + user._id + '/cart', tempCart, httpOptions)
  }

  // Add Product To The Cart
  addProduct(tempCart: Cart, tempProduct: Product): void {
    if (!this.exists(tempCart, tempProduct)) {
      tempCart.products.push(tempProduct);
      tempCart.totalPrice += tempProduct.price;
      var user = this.userService.getUser();
      this.messageService.viewSuccess('Added product ' + tempProduct.name + ' to the cart successfully');
      if (user)
        this.updateCart(tempCart).subscribe(function (res) { });
      else
        this.setCartToLocalStorage(tempCart);
    }
  }

  // Remove Product From The Cart
  removeProduct(tempCart: Cart, tempProduct: Product): void {
    var tempProducts: Product[] = [];
    for (let tempProduct2 of tempCart.products) {
      if (tempProduct._id != tempProduct2._id) {
        tempProducts.push(tempProduct2);
      }
    }
    tempCart.products = tempProducts;
    tempCart.totalPrice -= tempProduct.price;
    var user = this.userService.getUser();
    if (user) {
      this.updateCart(tempCart).subscribe(function (res) { });
    }
    else {
      this.setCartToLocalStorage(tempCart);
    }
  }

  // Clear Cart
  clearCart(tempCart: Cart): void {
    tempCart.products = [];
    tempCart.totalPrice = 0;
    var user = this.userService.getUser();
    if (user)
      this.updateCart(tempCart).subscribe(function (res) { });
    else
      this.clearLocalStorage();
  }

  // Check If Product Is In The Cart
  exists(tempCart: Cart, tempProduct: Product): boolean {
    for (let tempProduct2 of tempCart.products) {
      if (tempProduct._id == tempProduct2._id) {
        return true;
      }
    }
    return false;
  }

  // Get Cart From Local Storage
  getCartFromLocalStorage(): Cart {
    let tempCart = JSON.parse(localStorage.getItem("cart_t10_sprint1"));
    return (tempCart != null) ? tempCart : { products: [], totalPrice: 0 };
  }

  // Save Cart To Local Storage
  setCartToLocalStorage(tempCart: Cart): void {
    localStorage.setItem("cart_t10_sprint1", JSON.stringify(tempCart));
  }

  // Clear Local Storage
  clearLocalStorage(): void {
    localStorage.clear();
  }

}

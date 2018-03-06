import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PatternValidator } from '@angular/forms';
import { Location } from '@angular/common';
import { CartService } from '../../../cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private UserService: UserService, private CartService: CartService,
    private location: Location) { }

  formInput = <any>{};

  loginUser() {
    var user = {
      emailAddress: this.formInput.emailAddress,
      password: this.formInput.password
    };
    var self = this;
    this.UserService.login(user).subscribe(function (res) {
      if (res.msg === 'User retrieved successfully.') {
        self.UserService.updateUser(res.data);
        // cart update
        var cart = self.CartService.getCartFromLocalStorage();
        if (cart.products.length) {
          self.CartService.updateCart(cart).subscribe(function (res) { });
          self.CartService.clearLocalStorage();
        }
        // end cart update
        self.location.back();
      }
      else {
        alert(res.msg);
      }
    },
      function (error) {
        alert("Wrong password or email. Or User doesn't exist.");
      });
  }

  ngOnInit() {
  }

}

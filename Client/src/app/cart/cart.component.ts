import { Component, OnInit } from '@angular/core';
import { Cart, Product } from '../definitions';
import { CartService } from '../cart.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { OrderService } from '../orders/order.service';
import { NbThemeService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart;
  shippingAddress: string = null;
  showModal: string = 'none';
  hb: any;

  source: any;

  settings = {
    actions: {
      add: false,
      edit: false
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Product',
        type: 'string'
      },
      price: {
        title: 'Price',
        type: 'number',
        valuePrepareFunction: (price) => {
          var formatted = this.currencyPipe.transform(price);
          return formatted;
        }
      },
      sellerName: {
        title: 'Seller Name',
        type: 'string'
      },
      createdAt: {
        title: 'Creation Date',
        type: 'string',
        valuePrepareFunction: (date) => {
          if (!date)
            return 'N/A';
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
        editable: false
      },
      updatedAt: {
        title: 'Last Modified',
        type: 'string',
        valuePrepareFunction: (date) => {
          if (!date)
            return 'N/A';
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
        editable: false
      }
    }
  }


  constructor(private cartService: CartService, private userService: UserService, private orderService: OrderService,
    private router: Router, private themeService: NbThemeService, private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {
    this.cart = {
      products: [],
      totalPrice: 0
    };
    this.themeService.getJsTheme().subscribe(theme => {
      var colors = theme.variables;
      this.hb = {
        class: 'btn-hero-success',
        default: {
          gradientLeft: `adjust-hue(${colors.success}, 20deg)`,
          gradientRight: colors.success,
        },
        cosmic: {
          gradientLeft: `adjust-hue(${colors.success}, 20deg)`,
          gradientRight: colors.success,
          bevel: `shade(${colors.success}, 14%)`,
          shadow: 'rgba (33, 7, 77, 0.5)',
          glow: `adjust-hue(${colors.success}, 10deg)`,
        }
      }
    });
  }

  ngOnInit() {
    var user = this.userService.getUser()
    if (user)
      this.cartService.getCart().subscribe(res => {
        this.cart = res.data;
        this.source = res.data.products
      });
    else {
      this.cart = this.cartService.getCartFromLocalStorage();
      this.source = this.cartService.getCartFromLocalStorage().products;
    }
  }

  getCart(): void {
    this.cartService.getCart().subscribe(cart => this.cart = cart);

  }

  onDeleteConfirm(event): void {
    if (window.confirm(
      'Name: ' + event.data.name +
      '\nPrice: ' + this.currencyPipe.transform(event.data.price) +
      '\nSeller Name: ' + event.data.sellerName +
      '\nDelete product?'
    )) {
      this.cartService.removeProduct(this.cart, event.data)
      event.confirm.resolve();
    }
  }

  checkout(): void {
    if (this.userService.getUser() === null) {
      this.router.navigate(['dashboard/auth/login']);
    }
    else {
      this.showModal = 'block';
    }
  }
  postOrders(): void {
    this.orderService.postOrders(this.shippingAddress).subscribe(function (res) {
      if (res.msg === 'Orders') {
        alert(`Your order is on its way!`);
      }
    },
    function(error)
    {
      alert('address must be specified');
    });
    this.showModal = 'none';
    this.router.navigate(['dashboard/orders']);
  }

  closeModal(): void {
    this.showModal = 'none';
  }
}

import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {

  datePipe = new DatePipe('en-EN');
  currencyPipe = new CurrencyPipe('en-EN');
  products: Product[];
  user = null;

  settings = {
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i mdTooltip="Tooltip!" class="fa fa-close"></i>'
    },
    add: {
      confirmCreate: true,
      addButtonContent: '<i mdTooltip="Tooltip!" class="fa fa-plus"></i>',
      createButtonContent: '<i mdTooltip="Tooltip!" class="fa fa-save"></i>',
      cancelButtonContent: '<i mdTooltip="Tooltip!" class="fa fa-close"></i>'
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i mdTooltip="Tooltip!" class="fa fa-edit"></i>',
      saveButtonContent: '<i mdTooltip="Tooltip!" class="fa fa-save"></i>',
      cancelButtonContent: '<i mdTooltip="Tooltip!" class="fa fa-close"></i>'
    },
    // actions: {

    //   custom: [
    //     {
    //       name: 'addToCart',
    //       title: '<i class="fa fa-shopping-cart"></i>'
    //     },
    //   ]
    // },
    columns: {
     
      name: {
        title: 'Product Name',
        type: 'string'
      },
      price: {
        title: 'Price',
        type: 'number',
        valuePrepareFunction: (price) => {
          var raw = price;

          var formatted = this.currencyPipe.transform(raw, 'USD', 'symbol');
          return formatted;
        }
      },
      sellerName: {
        title: 'Seller',
        type: 'string',
        editable: false
      },
      createdAt: {
        title: 'createdAt',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },
      updatedAt: {
        title: 'updatedAt',
        editable: false,
        valuePrepareFunction: (date) => {
          if (date == "")
            return "";
          var raw = new Date(date);

          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      }
    }
  };

  constructor(
    private storeService: StoreService,
    private userService: UserService
   
  ) { }

  ngOnInit() {
    this.getProducts();
  }


  getProducts(): void {
    this.storeService.getProducts().subscribe(products => this.products = this.filterProducts(products.data));
  }


  onDeleteConfirm(event) {
    this.user = this.userService.getUser();
    if (this.user && (this.user.userType == 'admin')) {
     
      this.storeService.deleteProduct(event.data).subscribe(
        response => response.err == null ? event.confirm.resolve() : event.confirm.reject()
      );
    }
    else {
      event.confirm.resolve();
      this.getProducts();
      alert('You have to be an Admin to delete products.');
    }
  }

  onCreateConfirm(event) {
    this.user = this.userService.getUser();
    if (this.user && (this.user.userType == 'admin' || this.user.userType == 'manager')) {
     
      this.storeService.createProduct(event.newData).subscribe(
        response => {
          if (response.err == null) {
            event.confirm.resolve(response.data);
            this.getProducts();
          }
          else
            event.confirm.reject()
        }
      );
    }
    else {
      event.confirm.resolve();
      this.getProducts();
      alert('You have to be an Admin or a Manager to Create products.');
    }
  } 

  onSaveConfirm(event) {
    this.user = this.userService.getUser();
    if (this.user && (this.user.userType == 'admin' || this.user.userType == 'manager')) {
      // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
      this.storeService.updateProduct(event.newData).subscribe(
        response => response.err == null ? event.confirm.resolve(event.newData) : event.confirm.reject()
      );
    }
    else {
      event.confirm.resolve();
      this.getProducts();
      alert('You have to be an Admin or a Manager to update products.');
    }
  }

  filterProducts(products: Product[]): Product[] {
    var returnValue = [];
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      if (product.sellerName == 'Wessam') {
        returnValue.push(product);
      }
    }
    return returnValue;
  }


}

import { Component, OnInit } from '@angular/core';
import {Order} from './Order';
import {OrderService} from './order.service';
import { Router } from '@angular/router';
import {Product} from '../product';
import {UserService} from '../user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})


export class OrdersComponent implements OnInit {
  orders: Order[];
  constructor(private orderService:OrderService, private userService:UserService,private router: Router) { }
  getOrders(): void {
  this.orderService.getOrders().subscribe(res => this.orders = res.data);
}

  ngOnInit() {
    if(this.userService.getUser()===null){
      this.router.navigate(['dashboard/auth/login']);
    }
    else{
    this.getOrders();
  }
  }
}

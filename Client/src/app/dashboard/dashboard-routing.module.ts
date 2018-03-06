import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CompanyComponent } from './company/company.component';
import { StoreComponent } from '../store/store.component';
import { OrdersComponent } from '../orders/orders.component';
import { CartComponent } from '../cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'items',
        // loadChildren: './items/items.module#ItemsModule'
        component: StoreComponent
      },
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      },
      {
        path: 'company',
        component: CompanyComponent
      },
      {
        path: 'store',
        component: StoreComponent
      },
      {
        path: 'orders',
      component: OrdersComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full'
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule { }

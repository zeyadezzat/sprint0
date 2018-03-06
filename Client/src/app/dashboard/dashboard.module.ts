import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CompanyComponent } from './company/company.component';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart.service';
import { StoreComponent } from '../store/store.component';
import { StoreService } from '../store.service';
import { OrdersComponent } from '../orders/orders.component';
import { FormsModule } from '@angular/forms';
import { MessageHandlerComponent} from '../store/message-handler/message-handler.component';
import { DatePipe, CurrencyPipe } from '@angular/common';

@NgModule({
  imports: [ThemeModule, DashboardRoutingModule, FormsModule],
  declarations: [DashboardComponent, CompanyComponent, StoreComponent,MessageHandlerComponent, OrdersComponent, CartComponent],
  entryComponents: [],
  providers: [CartService, StoreService, DatePipe, CurrencyPipe]
})
export class DashboardModule { }

import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NbEmailPassAuthProvider, NbAuthModule, NbAuthService} from '@nebular/auth';
import { OrderService } from './orders/order.service';
import { UserService } from './user.service';
// import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { UserService } from './user.service';
// import { FormsModule }   from '@angular/forms';
import { CartService } from './cart.service';
// import { OrderService } from './orders/order.service';
import { MessageService } from './message.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    AppRoutingModule,
    Ng2SmartTableModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },MessageService, NbAuthService, OrderService, UserService]
})
export class AppModule {}

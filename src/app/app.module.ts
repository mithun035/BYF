import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppInterceptor } from './app.interceptor';
import { GoogleChartsModule } from 'angular-google-charts';
import { MaterialModule } from '../material.module';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HomeComponent,
    NavBarComponent,
  ],
  imports: [
    GoogleChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [CookieService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

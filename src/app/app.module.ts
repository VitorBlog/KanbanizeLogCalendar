import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarComponent } from './calendar/calendar.component';
import {InterceptorModule} from "./module/interceptor.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    InterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

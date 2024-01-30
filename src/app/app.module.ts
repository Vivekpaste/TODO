import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CompletedtaskComponent } from './completedtask/completedtask.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UpcomingtaskComponent } from './upcomingtask/upcomingtask.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CompletedtaskComponent,
    AddtaskComponent,
    UpcomingtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DatePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

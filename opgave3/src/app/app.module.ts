import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { NavbarHeaderComponent } from './navbar-header/navbar-header.component';

import { BackendService } from './backend.service';
import {RouterModule} from "@angular/router";
import { ProgramsComponent } from './programs/programs.component';
import {LoggedInGuard} from "./logged-in.guard";
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarHeaderComponent,
    ProgramsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule,
    RouterModule.forRoot([
      {
        path: 'programs',
        component: ProgramsComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ])
  ],
  providers: [BackendService, LoggedInGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }

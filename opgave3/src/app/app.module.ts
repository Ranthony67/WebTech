import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { NavbarHeaderComponent } from './navbar-header/navbar-header.component';

import { BackendService } from './backend.service';
import {RouterModule} from "@angular/router";
import { ProgramsComponent } from './programs/programs.component';
import {LoggedInGuard} from "./logged-in.guard";
import { LoginComponent } from './login/login.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarHeaderComponent,
    ProgramsComponent,
    LoginComponent,
    SignOutComponent,
    SignUpComponent,
    ProgramDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'programs',
        component: ProgramsComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'programs/:id',
        component: ProgramDetailComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-out',
        component: SignOutComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ])
  ],
  providers: [BackendService, LoggedInGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }

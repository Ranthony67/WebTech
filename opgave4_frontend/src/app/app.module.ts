import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AlertModule} from 'ng2-bootstrap/ng2-bootstrap';

import {AppComponent} from './app.component';
import {NavbarHeaderComponent} from './navbar-header/navbar-header.component';

import {BackendService} from './backend.service';
import {RouterModule} from "@angular/router";
import {LoggedInGuard} from "./logged-in.guard";
import {LoginComponent} from './login/login.component';
import {SignOutComponent} from './sign-out/sign-out.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import appRoutes from "./routes";
import { ComponentComponent } from './component/component.component';
import { ComponentListComponent } from './component-list/component-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarHeaderComponent,
    LoginComponent,
    SignOutComponent,
    SignUpComponent,
    FrontpageComponent,
    ComponentComponent,
    ComponentListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BackendService, LoggedInGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
}

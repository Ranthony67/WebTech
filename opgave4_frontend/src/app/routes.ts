import {Routes} from "@angular/router";
import {FrontpageComponent} from "./frontpage/frontpage.component";
import {LoginComponent} from "./login/login.component";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {LoggedInGuard} from "./logged-in.guard";
import {SignUpComponent} from "./sign-up/sign-up.component";

var appRoutes: Routes = [
  {
    path: '',
    component: FrontpageComponent
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
];

export default appRoutes;

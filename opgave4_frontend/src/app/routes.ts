import {Routes} from "@angular/router";
import {FrontpageComponent} from "./frontpage/frontpage.component";
import {LoginComponent} from "./login/login.component";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {LoggedInGuard} from "./logged-in.guard";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ComponentCategoryListComponent} from "./component-category-list/component-category-list.component";
import {ComponentTypeListComponent} from "./component-type-list/component-type-list.component";
import {SearchForComponentComponent} from "./search-for-component/search-for-component.component";
import {ComponentsByCategoryComponent} from "./components-by-category/components-by-category.component";
import {ComponentsByTypeComponent} from "./components-by-type/components-by-type.component";

var appRoutes: Routes = [
  {
    path: '',
    component: FrontpageComponent
  },
  {
    path: 'component-categories',
    component: ComponentCategoryListComponent
  },
  {
    path: 'component-types',
    component: ComponentTypeListComponent
  },
  {
    path: 'component-search',
    component: SearchForComponentComponent
  },
  {
    path: 'components-by-category',
    component: ComponentsByCategoryComponent
  },

  {
    path: 'components-by-type',
    component: ComponentsByTypeComponent
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

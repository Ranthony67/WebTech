import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {BackendService} from "./backend.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private backendService: BackendService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.backendService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

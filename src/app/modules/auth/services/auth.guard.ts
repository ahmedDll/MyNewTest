import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router} from '@angular/router';
import { UserService } from 'src/app/_service/master/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _UserService: UserService,
    private _Router:Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = ;
    if ( localStorage.getItem('token')!= null&& localStorage.getItem('token')!='') {
      // logged in so return true
      return true;
    }
    else{
      this._Router.navigate(['/auth/login'])
      return false;
    }
    // not logged in so redirect to login page with the return url
    // this.authService.logout();
  }
}

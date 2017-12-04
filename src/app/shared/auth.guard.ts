import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app/';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate ,CanActivateChild, CanLoad{

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.check()      
   }

   canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.check()
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  private check(){
    return this.afAuth.authState
       .take(1)
       .map(user => user.providerData[0].providerId === "password")
       .do(loggedIn => {
         if (!loggedIn) {
           console.log("access denied")
           this.router.navigate(['/login']);
         }
     })
  }

}
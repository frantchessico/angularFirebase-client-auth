import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  user = null;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
      
    return this.authService.isAuthenticated().pipe(
      map(user => {
        if(user) {
          return true
        }else {
          this.router.navigate(['/login'])
          console.log('ko: ', this.user)
          return false;
        }
      })
    );
    
    //return !!this.user;                
    //return this.user ? true : false;                
   
  }
}

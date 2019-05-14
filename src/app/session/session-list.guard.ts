import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class SessionListGuard implements CanActivate
{
  constructor(private userService: UserService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    if (this.userService.getCurrentUserId())
    {
      console.log("SessionListGuard: ok");
      return true;
    }
    else
    {
      console.log("SessionListGuard: refusal");
      this.router.navigate(['/home']);
      return false;
    }
  }
}

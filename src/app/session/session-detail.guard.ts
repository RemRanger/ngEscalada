import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionDetailGuard implements CanActivate
{
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    const idUser = +next.url[1].path;
    //const idSession = next.paramMap.get('id');
    // console.log(id2);
    if (isNaN(idUser) || idUser < 1)
    {
      alert('Invalid product Id');
      this.router.navigate(['/sessions']);
      return false;
    }
    return true;
  }
}

import { Component } from '@angular/core';
import { Utils } from './shared/utils';
import { User } from './user/user';
import { UserService } from './user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  pageTitle = 'Escalada';
  
  constructor(private userService: UserService, private cookieService: CookieService) { }

  getCurrentUserId(): number { return this.userService.getCurrentUserId(); }

  getCurrentUserName(): string
  {
    let user: User = this.userService.getCurrentUser();
    return user ? user.firstName : null;
  }

  logout()
  {
    this.cookieService.set("userId", null);
    this.userService.setCurrentUserId(null);
  }
}

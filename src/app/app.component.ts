import { Component } from '@angular/core';
import { Utils } from './shared/utils';
import { User } from './user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  pageTitle = 'Escalada';

  getUser(): User { return Utils.getUser(); }

  logout()
  {
    Utils.setUser(null);
  }
}

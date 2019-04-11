import { Component } from '@angular/core';
import { Utils } from './shared/utils';
import { IClimber } from './climber/climber';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  pageTitle = 'Escalada';

  getUser(): IClimber { return Utils.getUser(); }

  logout() { Utils.setUser(null); }
}

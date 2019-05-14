import { Component } from '@angular/core';
import { Utils } from './shared/utils';
import { User } from './user/user';
import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  pageTitle = 'Escalada';
  isAuthenticated: boolean;
  userName: string;

  constructor(public oktaAuth: OktaAuthService, public router: Router)
  {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated);
  }

  getUser(): User { return Utils.getUser(); }

  async ngOnInit()
  {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    //// returns an array of claims
    //const userClaims = this.isAuthenticated ? await this.oktaAuth.getUser() : null;

    //// user name is exposed directly as property
    //this.userName = userClaims ? userClaims.name : "";
  }

  login()
  {
    console.log("Login...");
    this.oktaAuth.loginRedirect('/profile');
  }

  async logout()
  {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('/');
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user/user.service';

const loginExpiry = 15 / (24 * 60); // 15 minutes;  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  login = new Login();
  user: User = null;
  errorMessage = '';

  constructor(private userService: UserService, private router: Router, private loginService: LoginService, private cookieService: CookieService) { }

  ngOnInit()
  {
  }

  submit(loginForm: NgForm)
  {
    console.log(loginForm.form);
    console.log('Login: ' + JSON.stringify(loginForm.value));
    this.loginService.getUser(loginForm.value.userName, loginForm.value.password).subscribe
      (
        user =>
        {
          this.user = user;
          console.log(this.user);
          if (this.user.id > 0)
          {
            this.userService.setCurrentUserId(this.user.id);
            this.cookieService.set("userId", this.user.id.toString(), loginExpiry);
            console.log("Success: userId =", this.user.id);
            this.router.navigateByUrl('/sessions');
          }
          else
          {
            this.userService.setCurrentUserId(null);
            console.log("Failure: userId =", this.user.id);
          }
        },
        error =>
        {
          this.errorMessage = <any>error;
          console.log("POST call in error", error);
        }
        ,
        () =>
        {
          console.log("The POST observable is now completed. response = ", this.userService.getCurrentUserId());
        }
      );
  }
}

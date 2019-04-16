import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login';
import { User } from '../user/user';
import { Utils } from '../shared/utils';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private loginService: LoginService) { }

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
            Utils.setUser(this.user);
            console.log("Success: userId =", this.user.id);
            this.router.navigateByUrl('/home');
          }
          else
          {
            Utils.setUser(null);
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
          console.log("The POST observable is now completed. response = ",  Utils.getUser());
        }
      );
  }
}

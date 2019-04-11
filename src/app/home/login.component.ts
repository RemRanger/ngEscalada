import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login';
import { IClimber } from '../climber/climber';
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
  errorMessage = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit()
  {
  }

  submit(loginForm: NgForm)
  {
    console.log(loginForm.form);
    console.log('Login: ' + JSON.stringify(loginForm.value));
    this.loginService.getUserId(loginForm.value.userName, loginForm.value.password).subscribe
      (
        climber =>
        {
          console.log(climber);
          Utils.setUser(climber);
          this.router.navigateByUrl('/home');
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

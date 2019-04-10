import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login';
import { IClimber } from '../climber/climber';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  login = new Login();
  userId: number = 0;
  errorMessage = '';

  constructor(private loginService: LoginService) { }

  ngOnInit()
  {
  }

  submit(loginForm: NgForm)
  {
    console.log(loginForm.form);
    console.log('Login: ' + JSON.stringify(loginForm.value));
    this.loginService.getUserId(loginForm.value.userName, loginForm.value.password).subscribe
      (
        userId => this.userId = userId,
        error =>
        {
          this.errorMessage = <any>error;
          console.log("POST call in error", error);
        },
        () =>
        {
          console.log("The POST observable is now completed. UserId= " + this.userId);
        }
      );
  }
}

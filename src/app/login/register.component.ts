import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'esc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
  user = new User();
  response: any;
  errorMessage = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit()
  {
    //TMP
    this.user.firstName = "Jack";
    this.user.lastName = "Jones";
    this.user.gender = "M";
    this.user.email = "jack@cat.com";
    this.user.userName = "jas";
    this.user.password = "abc";
    this.user.passwordMatch = "abc";
    //tmp
  }

  submit(registerForm: NgForm)
  {
    console.log(registerForm.form);
    console.log('Register: ' + JSON.stringify(registerForm.value));
    this.loginService.appendUser(registerForm.value).subscribe
      (
        response =>
        {
          this.response = response;
          console.log(this.response);
          if (this.response.id > 0)
          {
            console.log("Success: new user id =", this.response.id);
            this.router.navigateByUrl('/login');
          }
          else
          {
            console.log("Failure: could not create new user: ", this.response);
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
          console.log("The POST observable is now completed. response = ", this.response);
        }
      );
  }
}

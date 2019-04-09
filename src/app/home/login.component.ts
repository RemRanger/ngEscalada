import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  userId: number;
  errorMessage = '';

  constructor(private loginService: LoginService) { }

  ngOnInit()
  {
  }

  onSubmit()
  {
    this.loginService.getUserId("Rem", "CaisleanBan69").subscribe
      (
        userId => this.userId = userId,
        error => this.errorMessage = <any>error
      );
  }
}

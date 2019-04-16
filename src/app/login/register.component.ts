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
  user: User;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit()
  {
    this.user = new User();
  }

  submit(registerForm: NgForm)
  {
  }
}
